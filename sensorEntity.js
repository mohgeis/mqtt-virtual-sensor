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
        this.addAttribute('avail', 1);
        this.addAttribute('status', "OK");
        this.addAttribute('operation', "ON");
    };

    enable() {
        return this.attributes['avail'] = 1;
    };
    disable() {
        return this.attributes['avail'] =  0;
    };
    set(state) {
        this.attributes['avail'] = state;
    }
}

module.exports = sensorEntity;