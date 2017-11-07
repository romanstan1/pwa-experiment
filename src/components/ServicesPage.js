import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import MiniTicket from './modules/MiniTicket'
import {BigButton} from './modules/LinkButton'

export default class ServicesPage extends Component {

  render () {
    return (
      <span >
        <Ticket title="Services">
          <MiniTicket>
            <BigButton to='/neworder'> Go to - Place a New Order</BigButton>
          </MiniTicket>
          <MiniTicket>
            <BigButton to='/bookappointment'> Go to - Book a New Appointment</BigButton>
          </MiniTicket>
          <MiniTicket>
            <BigButton to='/myspecsavers'> Go to - Create a New Subscription</BigButton>
          </MiniTicket>
        </Ticket>
      </span>
    )
  }
}
