import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import Card from '../modules/Card'
import LinkButton from '../modules/LinkButton'
import {deleteAppointment} from '../../store/modules/actions'
import {addSeven} from '../../store/modules/seed'

class MyAppointments extends Component {
  deleteAppointment = (event, prop, value) => {
    this.props.dispatch(deleteAppointment(parseInt(event.target.id,10)))
  }

  render () {
    const {currentUser} = this.props
    const upcomingAppointments = currentUser.appointments.filter(app => moment(app.date,'MMMDDYYYY') >= moment())
    const pastAppointments = currentUser.appointments.filter(app => moment(app.date,'MMMDDYYYY') <= moment())
    return (<span>
      <Ticket title="My Appointments">
        <MiniTicket title="Upcoming Appointments">
          {upcomingAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
            .map((appointment,index)=>(
              <Card key={index} index={index}>
                Location: {appointment.location}
                <br/>
                Date: {(addSeven(appointment.date))}
                <br/>
                Time: {appointment.time}
                <br/>
                Appointment Type: {appointment.type}
                <br/>
                Optician: {appointment.optician}
                <br/>
                <div id={appointment.id} className='button' onClick={this.deleteAppointment}> Cancel Appointment</div>
              </Card>
            ))}
        </MiniTicket>
        <MiniTicket className='fixed' >
          <LinkButton to='/bookappointment'>Find Appointment </LinkButton>
        </MiniTicket>
        <MiniTicket title="Past Appointments">
          {pastAppointments.sort((a,b)=> new Date(a.date) - new Date(b.date))
            .map((appointment,index)=>(
              <Card key={index} index={index}>
                Location: {appointment.location}
                <br/>
                Date: {(addSeven(appointment.date))}
                <br/>
                Time: {appointment.time}
                <br/>
                Appointment Type: {appointment.type}
                <br/>
                Optician: {appointment.optician}
                <br/>
              </Card>
            ))}
        </MiniTicket>
      </Ticket>
    </span>)
  }
}
// {!!currentUser.appointments? currentUser.appointments.map((appointment,index)=>(
//   <Card key={index} index={index} title={appointment.location} onClick={this.deleteAppointment}>
//     Date: {appointment.date}<br/>
//     Optician: {appointment.optician}<br/><br/>
//     Appointment Type: {appointment.type}<br/>
//     Time: {appointment.time}<br/>
//   </Card>
// )) :null }
// <br/>
// <LinkButton to='/findappointment'> Go to - Find Appointment</LinkButton>

export default connect(state => ({
  currentUser: state.data.currentUser
}))(MyAppointments)
