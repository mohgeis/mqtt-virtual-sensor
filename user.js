const sensorEntity = require('./sensorEntity');

class user {
    constructor(sensorsCount, sensorType ) {
        this.sensorsCount = 0;
        this.sensorType = sensorType;
        this.userId = Math.floor(Math.random() * 10000000 );
        this.sensors = [];
        this.createSensorsList(sensorsCount);
        console.log("new parking sensor created: ", this.userId);
        this.sensorsCount = sensorsCount;
    }

    createSensorsList(sensorsCount) {
        for(var i = 0; i < sensorsCount; i++) {
            this.addSensor(i);
        }
    };

    addSensor(id = this.sensorsCount) {
        var newSensor = new sensorEntity('sensor-' + id , this.sensorType );
        this.sensors.push(newSensor);
        this.sensorsCount++ ;
        return newSensor;
    };
    removeSensor(id) {
        this.sensors.splice(id , 1);
    };

    set(state) {
        this.attributes['avail'] = state;
    }
}

module.exports = user;