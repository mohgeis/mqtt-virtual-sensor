import React, { Component } from "react";
import PropTypes from "prop-types";

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

  render() {
    const { sensorId, name, value } = this.props.sensor;
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            defaultChecked={value}
            onChange={this.props.markSensorComplete.bind(this, sensorId)}
          />{" "}
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
