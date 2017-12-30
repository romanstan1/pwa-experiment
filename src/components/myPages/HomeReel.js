import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import {addSeven} from '../../store/modules/seed'
import Card from '../modules/Card'
import Collapsible from 'react-collapsible';
import {clickedOnNotifications} from '../../store/modules/actions'
import ChatIntercom from '../modules/ChatIntercom'
import {AppointmentCard, OrderCard} from '../modules/Card'
import LinkButton from '../modules/LinkButton'
import specsImage1 from '../../content/images/specs_image_1.jpg'
import specsImage2 from '../../content/images/childrens-eye-health.jpg'

class CollapsibleParent extends Component {
  onOpen = () => {
    const {clickedOnNotifications,name} = this.props
    clickedOnNotifications(name.toLowerCase())
  }
  render () {
    const {numberOfNotifications,numberOfEntities,children,name} = this.props
    return (
      <Collapsible onOpen={this.onOpen} triggerSibling={()=><span className='titleCollapse'> Upcoming {name}</span>} transitionTime={100} trigger=" ">
      <span className='notificationBubble home'><div>{numberOfEntities}</div></span>
      {numberOfNotifications > 0? <span className='notificationBubble home dot homedot'><div></div></span> :null}
        {children}
      </Collapsible>
    )
  }
}

const MultipleAppointments = ({currentUser}) => {
  const upcomingAppointments = currentUser.appointments.filter(app => moment(app.date,'MMMDDYYYY') >= moment())
  return (<span> <div className='orderAndAppointments'>My eye tests</div>
    {upcomingAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
      .map((appointment,index)=>(
        <AppointmentCard
          key={index}
          location={appointment.location}
          date={(addSeven(appointment.date))}
          time={appointment.time}
        />

      ))}
    </span>)
}

const MultipleOrders = ({currentUser}) => {
  const upcomingOrders = currentUser.orders.filter(order => order.status === 'Processing'|| order.status ==='Out for delivery')
  return (<span> <div className='orderAndAppointments'>My orders</div>
    {upcomingOrders.sort((a,b)=> new Date(b.purchase_date) - new Date(a.purchase_date))
      .map((order,index)=>(
        <OrderCard
          key={index}
          index={index}
          delivery={(addSeven(order.purchase_date))}
          brand={order.brand}
          lense={order.type}
          status={order.status}
        />
      ))}
    </span>)
}

class HomeReel extends Component {

  clickedOnNotifications = (notificationType) => this.props.dispatch(clickedOnNotifications(notificationType))
  render () {
    const {currentUser} = this.props
    const {orders, appointments} = currentUser.notifications
    const {orders: clickedOrders, appointments: clickedAppointments} = currentUser.clicked_notifications
    return (
      <span>
        <Ticket title="Home">
          <div className='notificationCard'>
            <div className='welcomeMessage'> Good morning, {currentUser.first_name}</div>
            <CollapsibleParent
              clickedOnNotifications={this.clickedOnNotifications}
              numberOfEntities={appointments}
              numberOfNotifications={clickedAppointments}
              name='Appointments'>
              <MultipleAppointments currentUser={currentUser}/>
              <LinkButton to='/myappointments'> My Appointments</LinkButton>
            </CollapsibleParent>

            <CollapsibleParent
              clickedOnNotifications={this.clickedOnNotifications}
              numberOfEntities={orders}
              numberOfNotifications={clickedOrders}
              name='Orders'>
              <MultipleOrders currentUser={currentUser}/>
              <LinkButton to='/myorders'> My Orders</LinkButton>
            </CollapsibleParent>
          </div>

          <div className='content-image'>
            <div className='imageBox'><img src={specsImage1} alt="Content"/></div>
            <div className='textBox'> Fashion Trends & Celebrity Styles </div>
          </div>

          <div className='content-image'>
            <div className='imageBox'><img src={specsImage2} alt="Content"/></div>
            <div className='textBox'> Childrens Eye Care </div>
          </div>
          <br/>

        </Ticket>
      <ChatIntercom/>
    </span>)
  }
}


export default connect(state => ({
  currentUser: state.data.currentUser
}))(HomeReel)
