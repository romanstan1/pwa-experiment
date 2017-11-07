import React from 'react';
import {Link} from 'react-router-dom';

const Page = ({ title }) =>
<div className="App">
  <div className="App-header">
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
