import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Ticket from '../modules/Ticket'
import {addSeven} from '../../store/modules/seed'
import {clickedOnNotifications, setAppointments} from '../../store/modules/actions'
import ChatIntercom from '../modules/ChatIntercom'
import CollapsibleParent from '../modules/CollapsibleParent'
import {AppointmentCard, OrderCard} from '../modules/Card'
import LinkButton from '../modules/LinkButton'
import specsImage1 from '../../content/images/specs_image_1.jpg'
import sunglassesImage from '../../content/images/au-sunglasses-1.png'
import specsImage2 from '../../content/images/childrens-eye-health.jpg'
import * as firebase from 'firebase';
require("firebase/firestore");

const MultipleAppointments = ({currentUser}) => {
  const upcomingAppointments = currentUser.appointments.filter(app => moment(app.dateAndTime) >= moment())
  return (<span> <div className='orderAndAppointments'>My eye tests</div>
    {upcomingAppointments.sort((a,b)=> new Date(b.dateAndTime) - new Date(a.dateAndTime))
      .map((appointment,index)=>(
        <AppointmentCard
          key={index}
          appointment={appointment}
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

  clickedOnNotifications = (notificationType) => {
    // console.log("clickedOnNotifications",notificationType)
    this.props.dispatch(clickedOnNotifications(notificationType))
  }

  componentDidMount() {
    const fs = firebase.firestore();
    fs.collection("appointments").get().then(snap => {
      const keys = snap.docs.map(doc => doc.id)
      const appointments = snap.docs.map(doc => doc.data())
      const addIds = appointments.map((appointment, i) => { return {...appointment, uuid: keys[i]} })
      this.props.dispatch(setAppointments(addIds))
    })
  }

  render () {
    const {currentUser, weatherType} = this.props
    const upcomingAppointments = currentUser.appointments.filter(app => moment(app.dateAndTime) >= moment())
    const upcomingOrders = currentUser.orders.filter(order => order.status === 'Processing'|| order.status ==='Out for delivery')
    const {orders: clickedOrders, appointments: clickedAppointments} = currentUser.clicked_notifications
    return (
      <span>
        <Ticket title="Home">
          <div className='notificationCard topBorder'>
            <div className='welcomeMessage'> Good morning, {currentUser.first_name}</div>
            <CollapsibleParent
              clickedOnNotifications={this.clickedOnNotifications}
              numberOfEntities={upcomingAppointments.length}
              numberOfNotifications={clickedAppointments}
              name='Appointments'>
              <MultipleAppointments currentUser={currentUser}/>
              <LinkButton to='/myappointments'> My Appointments</LinkButton>
            </CollapsibleParent>

            <CollapsibleParent
              clickedOnNotifications={this.clickedOnNotifications}
              numberOfEntities={upcomingOrders.length}
              numberOfNotifications={clickedOrders}
              name='Orders'>
              <MultipleOrders currentUser={currentUser}/>
              <LinkButton to='/myorders'> My Orders</LinkButton>
            </CollapsibleParent>
          </div>

          <LinkButton extraClass='alone' to='/bookappointment'> Book a new Appointment</LinkButton>

          <div className='content-image'>
            {
              weatherType === 'Clear'?
              <span>
                <div className='imageBox'><img src={sunglassesImage} alt="Content"/></div>
                <div className='textBox'> Great deals on Sunglasses in store</div>
              </span> :
              <span>
                <div className='imageBox'><img src={specsImage1} alt="Content"/></div>
                <div className='textBox'> Fashion Trends & Celebrity Styles </div>
              </span>
            }

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
  currentUser: state.data.currentUser,
  weatherType: state.weatherType
}))(HomeReel)
