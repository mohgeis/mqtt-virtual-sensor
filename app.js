const sensorEntity = require('./sensorEntity');
const sensorUser = require('./user');
var path = require('path');
const express = require('express');
const mqtt = require('mqtt');
const { request } = require('express');
const user = require('./user');
const max_sensors_per_user = 20;
const express_app = express();
const mqtt_client = mqtt.connect('mqtt://broker.hivemq.com')
const interval = 5000;
const user_validity_timeout = 60 * 60 * 1000;
var sendSensorsUpdate;

var users = {};

var cors = require('cors');
express_app.use(cors());
express_app.use(express.static(path.join(__dirname, '/client/sensor-controller/build')));


mqtt_client.on('connect', () => {
    mqtt_client.publish('virtualsensor/connected', 'true')
    console.log('connected')
    start();
})

function start() {
    sendSensorsUpdate = setInterval(SendingUpdates, interval);
}

function stop() {
    clearInterval(sendSensorsUpdate);
}

// send mqtt msg to all users in the users' list.
async function SendingUpdates() {
    var d = new Date();
    console.log('publish sensors updates: ', d)
    console.log('there are: ', Object.keys(users).length, " users");
    for (userKey in users) {
        console.log('User: ', userKey)
        var mqttTransmitMsg = JSON.stringify(users[userKey]);
        var extraLogMsg = mqttTransmitMsg.length > 100 ? " ....}" : "";
        console.log('sending state:', mqttTransmitMsg.substring(0,100), extraLogMsg)
        mqtt_client.publish('vsensor/' + userKey, mqttTransmitMsg)
    }
}

// remove user from the list
function removeUser(userId) {
    console.log("removing user: " + userId);
    delete users[userId];
}

// add new user
express_app.get('/user/add/:count/:type', (req, res) => {
    var type = req.params.type;
    var count = req.params.count;
    if (count > max_sensors_per_user) {
        count = max_sensors_per_user;
    } else if (count < 0) {
        res.status(500).send('cannot create negetive number of sensors');
    }
    var newUser = new sensorUser(count, type);
    users[newUser.userId] = newUser;
    setTimeout(() => { removeUser(newUser.userId) }, user_validity_timeout);
    res.send(newUser);
});

// add sensor to existing user
express_app.get('/user/:userId/sensor/add/:comments?', (req, res) => {
    var userId = parseInt(req.params.userId);
    var comments = req.params.comments;
    if (!(userId in users)) {
        res.status(501).send('user doesnt exists');
        return;
    }
    if (users[userId].sensors.length >= max_sensors_per_user) {
        res.status(401).send("max number of sensors is reached!")
    }
    users[userId].addSensor(comments=comments);
    res.send(users[userId]);
});

// get all sensors of an existing user api
express_app.get('/user/:userId/sensor', (req, res) => {
    var userId = parseInt(req.params.userId);
    if (!(userId in users)) {
        res.status(500).send('user doesnt exists');
        return;
    }
    res.send(users[userId]);
});

// delete a sensor from an existing user api
express_app.get('/user/:userId/sensor/:sensorId/del', (req, res) => {
    var userId = parseInt(req.params.userId);
    var sensorId = req.params.sensorId;
    if (!(userId in users)) {
        res.status(500).send('user doesnt exists');
        return;
    }
    if (users[userId].removeSensor(sensorId)){
        res.send(users[userId]);
        return;
    } else {
        res.status(500).send('sensor does not exist');
    }
});

// set sensor value api
express_app.get('/user/:userId/sensor/:sensorId/set/:value', (req, res) => {
    var userId = parseInt(req.params.userId);
    var sensorId = req.params.sensorId;
    var value = parseInt(req.params.value);
    if (!(userId in users)) {
        res.status(500).send('user doesnt exists');
        return;
    }
    users[userId].setSensorValue(sensorId, value);
    res.send(users[userId]);
});

express_app.get('/help', (req, res) => {
    res.send('virtual sensor api: \n /lock/true \n /set/<sonsor_id>/true');
});

express_app.get('/test', (req, res) => {
    res.json({
        "hello": ["Developer", "M. Geis"]
    })
});

express_app.get('/', (req, res) => {
    var htmlPage = path.join(__dirname, '/client/sensor-controller/build/index.html');
    res.sendFile(htmlPage);
})

let port = process.env.PORT || 5000;
express_app.listen(port, () => console.log('Sensor app listening on port ', port, '!'));

