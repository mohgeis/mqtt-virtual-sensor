const sensorEntity = require('./sensorEntity');
const sensorUser = require('./user');
var path = require('path');

const express = require('express');
const mqtt = require('mqtt');
const { request } = require('express');
const user = require('./user');
const max_sensors_per_user = 10;
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

// send mqtt msg to all users in the list.
async function SendingUpdates() {
    var d = new Date();
    console.log('publish sensors updates: ', d)
    console.log('there are: ', Object.keys(users).length, " users");
    for (userKey in users) {
        console.log('User: ', userKey)
        console.log('sending state:', JSON.stringify(users[userKey]))
        mqtt_client.publish('vsensor/' + userKey, JSON.stringify(users[userKey]))
    }
}

// remove user from the list
function removeUser(userId) {
    console.log("removing user: " + userId);
    delete users[userId];
}

// add new user api
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

// add sensor to existing user api
express_app.get('/user/:userId/sensor/add', (req, res) => {
    var userId = parseInt(req.params.userId);
    if (!(userId in users)) {
        res.status(501).send('user doesnt exists');
        return;
    }
    users[userId].addSensor();
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
    var sensorId = parseInt(req.params.sensorId);
    var value = parseInt(req.params.value);
    console.log(userId, sensorId, value);
    if (!(userId in users)) {
        res.status(500).send('user doesnt exists');
        return;
    }
    if (isNaN(sensorId) || isNaN(value)) {
        res.send('invalid sensor id: ' + sensorId + " or value: " + value);
        return;
    }
    if (sensorId < 0 || sensorId >= users[userId].sensors.length) {
        res.send('unkown sensor id: ' + sensorId);
        return;
    }
    users[userId].sensors[sensorId].set(value);
    res.send('sensor-' + sensorId + " is set to: " + value);
});

express_app.get('/help', (req, res) => {
    res.send('virtual sensor api: \n /lock/true \n /set/<sonsor_id>/true');
});

express_app.get('/test', (req, res) => {
    res.json({
        "hello": ["Mohamed", "Geis"]
    })
});

express_app.get('/', (req, res) => {
    var htmlPage = path.join(__dirname, '/client/sensor-controller/build/index.html');
    console.log(htmlPage);
    res.sendFile(htmlPage);
})

let port = process.env.PORT || 5000;
express_app.listen(port, () => console.log('Sensor app listening on port ', port, '!'));

