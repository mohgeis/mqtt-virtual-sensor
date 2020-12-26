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
var mqtt_lock = false;
var sendSensorsUpdate;

var users = {};

mqtt_client.on('connect', () => {
    mqtt_client.publish('parking/connected', 'true')
    console.log('connected')
    start();
})

function start() {
    sendSensorsUpdate = setInterval(SendingUpdates, interval);
}

function stop() {
    clearInterval(sendSensorsUpdate);
}

async function SendingUpdates() {
    var d = new Date();
    console.log('publish sensors updates: ', d)
    if (!mqtt_lock) {
        for (userKey in users) {
            console.log('sending user: ', userKey)
            console.log('sending state:', JSON.stringify(users[userKey]))
            mqtt_client.publish('vsensor/' + userKey, JSON.stringify(users[userKey]))
        }
    }
}


var cors = require('cors');
express_app.use(cors());
express_app.use(express.static(path.join(__dirname, 'client/v-sensor-controller')));

express_app.get('/lock/:lock', (req, res) => {
    if (req.params.lock.toLocaleLowerCase === 'true') {
        mqtt_lock = true;
        res.send('Locking mqtt messages');
    } else if (req.params.lock.toLocaleLowerCase === 'false') {
        mqtt_lock = false;
        res.send('Unlocking mqtt messages');
    } else {
        res.send('request is unrecognized!');
    }
});

express_app.get('/user/add/:count/:type', (req, res) => {
    var type = req.params.type;
    var count = req.params.count;
    if (count > max_sensors_per_user) {
        count = max_sensors_per_user;
    } else if (count < 0) {
        res.send('cannot create negetive number of sensors');
    }
    var newUser = new sensorUser(count, type);
    users[newUser.userId] = newUser;
    res.send(newUser);
});

express_app.get('/user/:userId/sensor/add', (req, res) => {
    var userId = parseInt(req.params.userId);
    if (!(userId in users)){
        res.send('user doesnt exists');
        return;
    }
    var newSensor = users[userId].addSensor();
    res.send(newSensor);
});

express_app.get('user/:userId/sensor/:sensorId/del', (req, res) => {
    var userId = parseInt(req.params.userId);
    var sensorId = parseInt(req.params.sensorId);
    if (!(userId in users)){
        res.send('user doesnt exists');
        return;
    }
    if (sensorId < 0 || sensorId >= users[userId].sensors.length ) {
        res.send('sensor id: ' + sensorId + " is out of range");
    }
    users[userId].removeSensor(sensorId);
    res.send('sensor: ' + sensorId + " has been removed");
});

express_app.get('/user/:userId/sensor/:sensorId/set/:state', (req, res) => {
    var userId = parseInt(req.params.userId);
    var sensorId = parseInt(req.params.sensorId); 
    var state = parseInt(req.params.state);
    if (!(userId in users)){
        res.send('user doesnt exists');
        return;
    }
    if (sensorId < 0 || sensorId >= users[userId].sensors.length || !(state in [0, 1])) {
        res.send('unkown request id: ' + id + " with state: " + state);
    }
    users[userId].sensors[sensorId].set(state);
    res.send('sensor-' + sensorId + " is set to: " + state);
});

express_app.get('/help', (req, res) => {
    res.send('virtual sensor api: \n /lock/true \n /set/<sonsor_id>/true');
});

express_app.get('/test', (req, res) => {
    res.json({
        "hello": ["Mohamed", "Geis"]
    })
});

express_app.get ('*', (req,res) => {
    var htmlPage = path.join(__dirname,'/client/v-sensor-controller/build/index.html');
    console.log(htmlPage);
    res.sendFile(htmlPage);
})

let port = process.env.PORT || 5000;
express_app.listen(port, () => console.log('Sensor app listening on port ', port,'!'));

