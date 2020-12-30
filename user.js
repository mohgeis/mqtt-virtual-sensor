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
            this.addSensor();
        }
    };

    addSensor(comments="") {
        var id = this.sensorsCount;
        var newSensor = new sensorEntity('sensor-' + id , this.sensorType, comments );
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

    setSensorValue(id, value) {
        console.log("setting sensor: ", id , " with value: ", value)
        var updated = false;
        var newSensors = this.sensors.map( s => {
            if (s.sensorId === id) {
                s.value = value;
                updated = true;
            }
            return s;
        });
        this.sensors = newSensors;
        return updated;
    };

    set(state) {
        this.attributes['avail'] = state;
    }
}

module.exports = user;