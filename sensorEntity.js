const sensorAttribute = require('./sensorAttribute');

class sensorEntity {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.attributes = {};
        this.setParkingSensorAttributes();
        console.log("new parking sensor created: ", name);
    }
    addAttribute (name, value) {
        this.attributes[name] = value;
    };
    setParkingSensorAttributes() {
        this.addAttribute('avail', true);
        this.addAttribute('status', "OK");
        this.addAttribute('operation', "ON");
    };

    enable() {
        return this.attributes['avail'] = true;
    }
    disable() {
        return this.attributes['avail'] =  false;
        console.log('sensor disabled')
    }
}

module.exports = sensorEntity;