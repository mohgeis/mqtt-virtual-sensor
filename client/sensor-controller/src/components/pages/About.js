import React from 'react'
import { FaGithub } from 'react-icons/fa';


function About() {
  return (
    <React.Fragment>
      <h1>About</h1>
      <p>This is a Virtual Sensors app v1.0.0.</p>
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