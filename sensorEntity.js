const sensorAttribute = require('./sensorAttribute');

class sensorEntity {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.attributes = [];
        this.setParkingSensorAttributes();
        console.log("new parking sensor created: ", name);
    }
    addAttribute (name, value) {
        var attr = new sensorAttribute(name, value);
        this.attributes.push(attr);
    };
    setParkingSensorAttributes() {
        this.addAttribute('avail', 1);
        this.addAttribute('status', "OK");
        this.addAttribute('operation', "ON");
    };
}

module.exports = sensorEntity;