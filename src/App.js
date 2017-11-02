import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import Page from './components/templates/PageTemplate.js'
import './App.css';

const browserHistory = createBrowserHistory()

const Home = (props) => <Page title="Home"/>
const About = (props) => <Page title="About"/>
const Settings = (props) => <Page title="Settings"/>

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/settings" component={Settings}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
