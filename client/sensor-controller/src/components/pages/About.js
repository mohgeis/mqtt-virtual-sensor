import React from 'react'
import { FaGithub } from 'react-icons/fa';


function About() {
  return (
    <React.Fragment>
      <h1>About</h1>
      <p>This is a Virtual Sensors app v1.0.0</p>
      <br></br>
      <h4>Reciever configuration:</h4>
      <ul>
        <li>Broker Server: broker.hivemq.com</li>
        <li>port: 1883</li>
        <li>topic: virtualsensor/"ID"</li>
      </ul>
      <br></br>
      <p>Check the GitHub repository
        <a style={linkStyle} href="https://github.com/mohgeis/mqtt-virtual-sensor"> here <FaGithub /></a>
      </p>
    </React.Fragment>
  )
}

const linkStyle = {
  color: 'blue',
  textDecoration: 'none'
}

export default About;