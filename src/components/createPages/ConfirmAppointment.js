import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import Card from '../modules/Card'
import MiniTicket from '../modules/MiniTicket'
import LinkButton from '../modules/LinkButton'
import {AppointmentCard} from '../modules/Card'

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

            <br/>
            {!!appointment?

            <AppointmentCard
              extraClass='confirmation'
              location={appointment.location}
              date={(addSeven(appointment.date))}
              time={appointment.time}
              optician={appointment.optician}
            >
              <div className='children'>

                  {appointment.for ==='Someone else'?
                <div className='someoneElse'>
                  <div><h2>Appointment for someone else</h2></div>
                  <div><h2>Title - </h2><h3>{appointment.secondPerson.title}</h3></div>
                  <div><h2>First name -</h2><h3>{appointment.secondPerson.first_name}</h3></div>
                  <div><h2>Last name -</h2><h3>{appointment.secondPerson.last_name}</h3></div>
                  <div><h2>Date of birth -</h2><h3>{appointment.secondPerson.dob}</h3></div>
                </div> : null }

                <div className='extras'><h2>Additional Info:</h2><h3>{appointment.additional}</h3></div>
                <div className='extras'><h2>Store Phone Number:</h2><h3>{appointment.phoneNumber}</h3></div>
                <div className='button directions'>
                  <a target="_blank"
                    href={`https://www.google.co.uk/maps/dir/specsavers ${appointment.address.substr(appointment.address.length - 12)}/${appointment.homeLocation.lat},${appointment.homeLocation.lng}`}>
                    Get Directions
                  </a>
                </div>

                <div className='button cancel' onClick={this.cancelAppointment}> Cancel Appointment</div>
                <div className='button primary' onClick={this.handleConfirmAppointment}> Confirm Appointment</div>

              </div>
            </AppointmentCard>
             :
            <Card>
              Appointment Cancelled
              <LinkButton extraClass='' to='/bookappointment'>Book a new Appointment</LinkButton>
              <LinkButton extraClass='secondary' to='/myappointments'>My Appointments</LinkButton>
            </Card>}
        </MiniTicket>
        <br/>
        </Ticket>
        <br/>
      </span>)
  }
}


export default connect(state => ({
  currentUser: state.data.currentUser,
  appointment: state.data.bookAppointment
}))(ConfirmAppointment)
