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
        var newSensors = this.sensors.filter( s => s.sensorId != id);
        if (newSensors.length === this.sensors.length){
            console.log ("no user has been removed");
            return false;
        }
        this.sensors = newSensors;
        return true;
    };

    set(state) {
        this.attributes['avail'] = state;
    }
}

module.exports = user;