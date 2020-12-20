const sensorEntity = require('./sensorEntity');
const express = require('express');
const mqtt = require('mqtt')

const express_app = express();
const mqtt_client = mqtt.connect('mqtt://broker.hivemq.com')

var state = 'closed'

mqtt_client.on('connect', () => {
    mqtt_client.publish('parking/connected', 'true')
    console.log('connected')

    loopSendingUpdates();

})

function sendStateUpdate(sensorData) {
    console.log('sending state:', sensorData.name, ":", sensorData.attributes[0])
    mqtt_client.publish('parking/state', JSON.stringify(sensorData))
}

async function loopSendingUpdates() {
    var sensor_1 = new sensorEntity('slot-1', 'parking-sensor');
    for (; ;) {
        sendStateUpdate(sensor_1);
        await sleep(3000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

express_app.get('/test', (req, res) => {
    res.send('An alligator approaches!');
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
express_app.listen(port, () => console.log('Gator app listening on port 3000!'));

