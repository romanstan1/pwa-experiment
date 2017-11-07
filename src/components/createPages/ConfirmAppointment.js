import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import Card from '../modules/Card'
import MiniTicket from '../modules/MiniTicket'
import LinkButton from '../modules/LinkButton'

import {clearAppointmentCache,confirmAppointment} from '../../store/modules/actions'
import {addSeven} from '../../store/modules/seed'

const ConfirmPopUp = ({show}) => {
  const componentClasses = ['confirmAppointmentPopUp']
  if (show) componentClasses.push('show')
  return (
    <div className={componentClasses.join(' ')}>
      <span>Appointment Booked!</span>
      <br/>
      <LinkButton to='/myappointments'> Continue </LinkButton>
    </div>
  )
}

class ConfirmAppointment extends Component {
  state = {
    confirmed:false
  }

  cancelAppointment = () => {
    this.props.history.push(`/myappointments`)
  }

  handleConfirmAppointment = () => {
    this.props.dispatch(confirmAppointment())
    this.setState({confirmed: true})
  }

  componentWillUnmount () {
    this.props.dispatch(clearAppointmentCache())
  }

  render () {
    const {appointment} = this.props
    return (
      <span>
        <ConfirmPopUp show={this.state.confirmed}/>
        <Ticket title="Confirmation">
          <MiniTicket title="Confirm Appointment">
            {!!appointment?
            <Card>
              Location: {appointment.address}
              <br/>
              Date: {(addSeven(appointment.date))}
              <br/>
              Time: {appointment.time}
              <br/>
              Appointment Type: {appointment.type}
              <br/>
              Appointment is For: {appointment.for}
              <br/>
              {appointment.for ==='Someone else'?
              <span>
                 Their details :- <br/>
                 Title: {appointment.secondPerson.title} <br/>
                 First name: {appointment.secondPerson.first_name} <br/>
                 Last name: {appointment.secondPerson.last_name} <br/>
                 Date of birth: {appointment.secondPerson.dob} <br/>
              </span> : null }
              Optician: {appointment.optician}
              <br/>
              Additional Info: {appointment.additional}
              <br/>
              Store Phone Number: {appointment.phoneNumber}
              <br/>
              <br/>

              <div className='button'>
                <a target="_blank"
                  href={`https://www.google.co.uk/maps/dir/specsavers ${appointment.address.substr(appointment.address.length - 12)}/${appointment.homeLocation.lat},${appointment.homeLocation.lng}`}> Get Directions</a>
              </div>
              <br/>
              <br/>
              <div className='button' onClick={this.cancelAppointment}> Cancel Appointment</div>
              <div className='button' onClick={this.handleConfirmAppointment}> Confirm Appointment</div>
            </Card> :
            <Card>
              Appointment Cancelled
            </Card>}
        </MiniTicket>
        </Ticket>
      </span>)
  }
}


export default connect(state => ({
  currentUser: state.data.currentUser,
  appointment: state.data.bookAppointment
}))(ConfirmAppointment)
