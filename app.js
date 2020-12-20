const sensorEntity = require('./sensorEntity');
const express = require('express');
const mqtt = require('mqtt')

const express_app = express();
const mqtt_client = mqtt.connect('mqtt://broker.hivemq.com')

var sensor_1 = new sensorEntity('slot-1', 'parking-sensor');
var mqtt_lock = false;

mqtt_client.on('connect', () => {
    mqtt_client.publish('parking/connected', 'true')
    console.log('connected')

    loopSendingUpdates();

})

function sendStateUpdate(sensorData) {
    console.log('sending state:', JSON.stringify(sensorData))
    mqtt_client.publish('parking/state', JSON.stringify(sensorData))
}

async function loopSendingUpdates() {
    for (; ;) {
        if (!mqtt_lock){
            sendStateUpdate(sensor_1);
        }
        await sleep(3000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


express_app.get('/', (req, res) => {
    res.send('virtual sensor is running.');
});

express_app.get('/lock', (req, res) => {
    mqtt_lock=true;
    res.send('Locking mqtt messages');
});

express_app.get('/unlock', (req, res) => {
    mqtt_lock=false;
    res.send('Unlocking mqtt messages');
});

express_app.get('/test', (req, res) => {
    res.send('An alligator approaches!');
});

express_app.get('/on', (req, res) => {
    sensor_1.enable();
    res.send('sensor enabled');
});
express_app.get('/off', (req, res) => {
    sensor_1.disable()
    res.send('sensor disabled');
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
express_app.listen(port, () => console.log('Gator app listening on port 3000!'));

