import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from './modules/Ticket'
import MiniTicket from './modules/MiniTicket'
import LinkButton from './modules/LinkButton'
import {logout,login} from '../store/modules/actions'

class NotLoggedIn extends Component {
  fingerprint = () => this.props.dispatch(login('tomoconnor', ''))
  render () {
    return (
      <span>
        <br/><br/>
        <LinkButton to='/loginpage'>Go to - Log In</LinkButton><br/>
        <span className='logOutButton' onClick={this.fingerprint}>
          <span>Use Fingerprint</span>
        </span><br/>
      </span>)
  }
}


class LoggedIn extends Component {
  logOut = () => this.props.dispatch(logout())
  render () {
    return (
      <span>
        <span className='logOutButton' onClick={this.logOut}>
          <span> Log Out </span>
        </span><br/>
        <LinkButton to='/homereel'>Go to - Home</LinkButton>
      </span>)
  }
}

class Homepage extends Component {

  render () {
    const {currentUser,dispatch} = this.props
    return (
      <span>
        <Ticket title='Log In'>
          <MiniTicket>
          {currentUser?
            <LoggedIn dispatch={dispatch} currentUser={currentUser}/> :
            <NotLoggedIn dispatch={dispatch} />}
          </MiniTicket>
        </Ticket>
        <br/>
        <br/>
        <br/>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(Homepage)
