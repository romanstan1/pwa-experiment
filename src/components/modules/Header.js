import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Header extends Component {

  state = {totalNotifications:0 }

  componentWillReceiveProps({currentUser}) {
    const totalNotifications = currentUser.clicked_notifications.orders + currentUser.clicked_notifications.appointments
    this.setState({totalNotifications})
  }

  render () {
    const {currentUser} = this.props
    const {totalNotifications} = this.state
    return (
      <nav>
        <div>
          <Link to='/homereel'> Home</Link>
          {!!currentUser && totalNotifications > 0? <span className='notificationBubble dot'>{totalNotifications}</span>:null}
        </div>
        <div><Link to='/shoppage'> Shop</Link></div>
        <div><Link to='/servicespage'> Services</Link></div>
        <div><Link to='/account'> Account</Link></div>
      </nav>
    )
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(Header)
