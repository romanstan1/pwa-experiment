import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';

const Page = ({ title }) =>
<div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>{title}</h2>
  </div>
  <p className="App-intro">
    This is the {title} page.
  </p>
  <p>
    <Link to="/">Home</Link>
  </p>
  <p>
    <Link to="/about">About</Link>
  </p>
  <p>
    <Link to="/settings">Settings</Link>
  </p>
</div>

export default Page
