var lib = require('./lib.js')

class sensorEntity {
    constructor(name, type, comments="") {
        this.name = name;
        this.sensorId = lib.makeid(5);
        this.value = 0;
        this.comments = comments;
        this.type = type;
        this.attributes = {};
        this.setParkingSensorAttributes();
        console.log("New sensor is created: ", name);
    }
    addAttribute (name, value) {
        this.attributes[name] = value;
    };

    setParkingSensorAttributes(status="OK", oper="ON") {
        this.addAttribute('status', status);  //sensor health check status.
        this.addAttribute('operation', oper); //turn on/off the sensor.
    };

    enable() {
        return this.attributes['operation'] = "ON";
    };
    disable() {
        return this.attributes['operation'] =  "OFF";
    };
    set(value=0) {
        this.value = value;
    }
}

module.exports = sensorEntity;