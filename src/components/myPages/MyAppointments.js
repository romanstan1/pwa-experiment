import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Ticket from '../modules/Ticket'
import LinkButton from '../modules/LinkButton'
import {deleteAppointment} from '../../store/modules/actions'
import {addSeven} from '../../store/modules/seed'
import {AppointmentCard} from '../modules/Card'
import CollapsibleParent from '../modules/CollapsibleParent'


// const MultipleAppointments = ({currentUser}) => {
//   const upcomingAppointments = currentUser.appointments.filter(app => moment(app.date,'MMMDDYYYY') >= moment())
//   return (<span> <div className='orderAndAppointments'>My eye tests</div>
//     {upcomingAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
//       .map((appointment,index)=>(
//         <AppointmentCard
//           key={index}
//           location={appointment.location}
//           date={(addSeven(appointment.date))}
//           time={appointment.time}
//         />
//       ))}
//     </span>)
// }

{/* <AppointmentCard
  key={index}
  location={appointment.location}
  date={(addSeven(appointment.date))}
  time={appointment.time}
  optician={appointment.optician}
> */}
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
                <div id={appointment.id} className='button cancel' onClick={this.deleteAppointment}> Cancel Appointment</div>
                </AppointmentCard>
              ))}
          </CollapsibleParent>
          <CollapsibleParent
             open={false}
             name='Past Appointments'
             numberOfEntities={pastAppointments.length}>
             {pastAppointments.sort((a,b)=> new Date(b.date) - new Date(a.date))
               .map((appointment,index)=>(
                 // <AppointmentCard
                 //   key={index}
                 //   location={appointment.location}
                 //   date={(addSeven(appointment.date))}
                 //   time={appointment.time}
                 //   optician={appointment.optician}
                 // />
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
