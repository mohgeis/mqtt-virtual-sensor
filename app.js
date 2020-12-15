const sensorEntity = require('./sensorEntity');
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var state = 'closed'

client.on('connect', () => {
    client.publish('parking/connected', 'true')
    console.log('connected')

    loopSendingUpdates();

})

function sendStateUpdate(sensorData) {
    console.log('sending state:', sensorData.name, ":", sensorData.attributes[0])
    client.publish('parking/state', JSON.stringify(sensorData))
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