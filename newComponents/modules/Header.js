import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


const NavLink = ({to, selected, text, children}) => {
  const active = selected === to? 'active' : ''
  return (
      <div className={active} data-value={to}>
        <Link to={`/${to}`}>{text}</Link>
        {children}
      </div>
    )
}

class Header extends Component {

  state = {totalNotifications:0 }

  componentWillReceiveProps({currentUser}) {
    if(currentUser) {
      const totalNotifications = currentUser.clicked_notifications.orders + currentUser.clicked_notifications.appointments
      this.setState({totalNotifications})
    }
  }

  render () {
    const {currentUser, selected, focusedState} = this.props
    const {totalNotifications} = this.state
    return (
      <nav className={focusedState === 'focus'? 'hide': ''}>
         <NavLink selected={selected}  to='homereel' text='Home'>
           {!!currentUser && totalNotifications > 0? <span className='notificationBubble dot'>{totalNotifications}</span>:null}
         </NavLink>
         <NavLink selected={selected} to='shoppage' text='Shop'/>
         <NavLink selected={selected} to='servicespage' text='Services'/>
         <NavLink selected={selected} to='account' text='Account'/>
      </nav>
    )
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser,
  selected: state.selected,
  focusedState: state.focusedState
}))(Header)
