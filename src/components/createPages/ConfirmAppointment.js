import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import Card from '../modules/Card'
import MiniTicket from '../modules/MiniTicket'
import LinkButton from '../modules/LinkButton'
import {AppointmentCard} from '../modules/Card'
import {clearAppointmentCache} from '../../store/modules/actions'
import * as firebase from 'firebase';
require("firebase/firestore");

const ConfirmPopUp = ({show, handlePopUp}) =>
  <div className={show? 'confirmAppointmentPopUp show': 'confirmAppointmentPopUp'}>
    <span>Appointment Booked!</span>
    <br/>
    <div className='continue' onClick={handlePopUp}> Continue </div>
  </div>

class ConfirmAppointment extends Component {
  state = {
    confirmed:false,
    show: false
  }

  cancelAppointment = () => {
    this.props.history.push(`/myappointments`)
  }

  deleteAppointment = (event) => {
    const id = event.target.dataset.uuid
    const fs = firebase.firestore();
    fs.collection("appointments").doc(id).delete().then(() => {
        console.log("Document successfully deleted!")
        this.props.dispatch(clearAppointmentCache())
    }).catch(error => {console.error("Error removing document: ", error)})
  }

  componentWillUnmount () {
    this.props.dispatch(clearAppointmentCache())
  }
  componentWillMount () {
    if(this.props.confirmedAppointment) {
      this.setState({show: true})
    }
  }

  handlePopUp = () => {
    this.setState({show: false})
  }

  render () {
    const {confirmedAppointment,currentUser} = this.props
    return (
      <span>
        <ConfirmPopUp handlePopUp={this.handlePopUp} show={this.state.show}/>
        <Ticket title="Confirmation">

          <div className='confirmAppointment'>
            {!!confirmedAppointment?
              <span>
                <h2>Your appointment is booked</h2>
                <div className='inner'>
                  <h3>{currentUser.first_name}'s Appointment</h3>
                  <AppointmentCard appointment={confirmedAppointment}>
                    <div data-uuid={confirmedAppointment.uuid} className='button cancel' onClick={this.deleteAppointment}> Cancel Appointment</div>
                  </AppointmentCard>
                </div>
              </span>
            :
            <Card>
              <div className='confirmAppointment'>
                <div className='inner'>
                  Appointment Cancelled
                </div>
              </div>
            </Card>}
            <LinkButton extraClass='' to='/bookappointment'>Book Another Appointment</LinkButton>
            <LinkButton extraClass='secondary confirm' to='/myappointments'>My Appointments</LinkButton>
          <br/>
          </div>
        </Ticket>
        <br/>
      </span>)
  }
}


export default connect(state => ({
  currentUser: state.data.currentUser,
  confirmedAppointment: state.data.confirmedAppointment
}))(ConfirmAppointment)
