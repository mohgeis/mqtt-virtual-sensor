import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sensors from './components/Sensors';
import AddSensor from './components/AddSensor'
import About from './components/pages/About';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    sensors: [],
    userId: 0
  };

  componentDidMount() {
    axios.get('/user/add/5/"parking-sensor"')
      .then(res => {
        this.setState({ sensors: res.data.sensors, userId: res.data.userId });
        console.log(this.state.sensors);
      });
  }

  // Toggle Sensor Complete
  markSensorComplete = id => {
    this.setState({
      userId: this.state.userId,
      sensors: this.state.sensors.map(sensor => {
        if (sensor.sensorId === id) {
          sensor.value++;
        }
        return sensor;
      })
    });
  };

  // Delete Sensor
  delSensor = id => {
    axios.get("/user/" + this.state.userId + "/sensor/" + id + "/del")
      .then(res =>
        this.setState({
          userId: this.state.userId,
          sensors: res.data.sensors
          //sensors: [...this.state.sensors.filter(sensor => sensor.sensorId !== id)]
        })
      ).catch(err => {
        this.checkConnection();
      });
  };

  // Add Todo
  addSensor = title => {
    axios.get('/user/' + this.state.userId + '/sensor/add')
      .then(res => {
        this.setState({
          userId: this.state.userId,
          sensors: res.data.sensors
        });
      }).catch(err => {
        this.checkConnection();
      });
  };

  checkConnection() {
    axios.get('/user/' + this.state.userId + '/sensor')
      .catch(err => {
        console.log(err);
        this.setState({ userId: 0, sensors: [] });
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header id={this.state.userId} />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddSensor addSensor={this.addSensor} />
                  {
                    <Sensors
                      sensors={this.state.sensors}
                      markSensorComplete={this.markSensorComplete}
                      delSensor={this.delSensor}
                    />
                  }
                  <div className="pre">
                    <br></br>
                    MQTT output message:
                  <pre>{JSON.stringify(this.state.sensors, null, 2)}</pre>
                  </div>
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
