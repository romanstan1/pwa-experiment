import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Ticket from '../modules/Ticket'
import LinkButton from '../modules/LinkButton'
import {deleteAppointment} from '../../store/modules/actions'
import {addSeven} from '../../store/modules/seed'
import {AppointmentCard} from '../modules/Card'
import CollapsibleParent from '../modules/CollapsibleParent'
import * as firebase from 'firebase';
import { setAppointments} from '../../store/modules/actions'
require("firebase/firestore");

class MyAppointments extends Component {
  deleteAppointment = (event) => {
    const id = event.target.dataset.uuid
    const fs = firebase.firestore();

    fs.collection("appointments").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    fs.collection("appointments").get().then(snap => {
      const keys = snap.docs.map(doc => doc.id)
      const appointments = snap.docs.map(doc => doc.data())
      const addIds = appointments.map((appointment, i) => { return {...appointment, uuid: keys[i]} })
      this.props.dispatch(setAppointments(addIds))
    })
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
    const {currentUser} = this.props
    const upcomingAppointments = currentUser.appointments.filter(app => moment(app.dateAndTime) >= moment())
    const pastAppointments = currentUser.appointments.filter(app => moment(app.dateAndTime) <= moment())
    return (<span>
      <Ticket title="My Appointments">
        <div className="notificationCard">
          <div className='welcomeMessage'>My Appointments</div>
          <CollapsibleParent
             open={true}
             name='Upcoming Appointments'
             numberOfEntities={upcomingAppointments.length}>
             {upcomingAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
               .map((appointment,index)=>(
                 <AppointmentCard
                   key={index}
                   appointment={appointment}
                 >
                <div data-uuid={appointment.uuid} className='button cancel' onClick={this.deleteAppointment}> Cancel Appointment</div>
                </AppointmentCard>
              ))}
          </CollapsibleParent>
          <CollapsibleParent
             open={false}
             name='Past Appointments'
             numberOfEntities={pastAppointments.length}>
             {pastAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
               .map((appointment,index)=>(
                 <AppointmentCard
                   key={index}
                   appointment={appointment}
                 />
               ))}
            </CollapsibleParent>
        </div>

        <LinkButton extraClass='alone' to='/bookappointment'>Book a New Appointment </LinkButton>
        <br/><br/><br/>
      </Ticket>
    </span>)
  }
}
export default connect(state => ({
  currentUser: state.data.currentUser
}))(MyAppointments)
