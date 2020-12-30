import React, { Component } from 'react';
import SensorItem from './SensorItem';
import PropTypes from 'prop-types';

class Sensors extends Component {

  componentDidMount = (props) => {
    console.log(this.props.sensors);
  };

  render() {
    return this.props.sensors.map((sensor) => (
      <SensorItem 
          key={sensor.sensorId} 
          sensor={sensor} 
          markSensorComplete={this.props.markSensorComplete} 
          delSensor={this.props.delSensor} 
      />
    ));
  }
}

// PropTypes
Sensors.propTypes = {
  sensors: PropTypes.array.isRequired,
  markSensorComplete: PropTypes.func.isRequired,
  delSensor: PropTypes.func.isRequired,
}

export default Sensors;