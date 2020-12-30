import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaCarSide, FaParking } from 'react-icons/fa';

export class SensorItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.sensor.completed ? "line-through" : "none",
    };
  };

  componentDidMount = (props) => {
    console.log(this.props.sensor);
  };

  getValue(value){
    if (value === 0) return 1;
    return 0;
  }

  render() {
    const { sensorId, name, value } = this.props.sensor;
    const sensorData = {id: sensorId, value: this.getValue(value)};
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            defaultChecked={value}
            onChange={this.props.markSensorComplete.bind(this, sensorData)}
          />
          {"  "}
          {this.props.sensor.value > 0 ? <FaCarSide /> : <FaParking /> }
          {"  "}
          {name}
          <button onClick={this.props.delSensor.bind(this, sensorId)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    );
  }
}

// PropTypes
SensorItem.propTypes = {
  sensor: PropTypes.object.isRequired,
  markSensorComplete: PropTypes.func.isRequired,
  delSensor: PropTypes.func.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};


export default SensorItem;
