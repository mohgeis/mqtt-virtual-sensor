# mqtt-virtual-sensor
This is a simplified MQTT virtual sensor 
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# New Features!

  - First version.

# Installation
To install the virtual sensor
[Install NodeJs](https://nodejs.org/en/download/package-manager/)

Then clone this project into your server
```
$ git clone https://github.com/mohgeis/mqtt-virtual-sensor.git
```
finally install and run the virtual sensor
```
$ cd mqtt-virtual-sensor
$ npm install
$ node app.js
```

if you face issues with the installation, then try to install [Mqtt](https://www.npmjs.com/package/mqtt) library separately:
```
$ npm install mqtt --save
```


### Todos before the first release

 - improve the virtual sensor signal structure.
 - add sensors aggregator.
 - add a control api.
 - add a graphical control dashboard.