import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

export class Header extends Component {

  render() {
    return (
      <header style={headerStyle}>
        <div style={devStyle}>
        <h1>Virtual Sensors</h1>
        <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
        {this.props.id > 0 ?
          <pre>ID: {this.props.id} </pre> :
          <pre>Connection lost ... Please refresh!</pre>
        }

        </div>
        <img
          src={logo}
          style={logoStyle}
          className="App-logo"
          alt="logo"
        />
      </header>
    )
  }
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  display: 'flex',
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

const logoStyle = {
  alignItems: 'right'
}
const devStyle = {
  width: '100%'
}

export default Header;