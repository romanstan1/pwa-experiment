import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import LinkButton from './modules/LinkButton'

export default class ServicesPage extends Component {

  render () {
    return (
      <span >
        <Ticket title="Services">
          <LinkButton extraClass='alone blue' to='/neworder'>Place a new order</LinkButton>
          <LinkButton extraClass='alone' to='/bookappointment'>Book a new appointment</LinkButton>
          <LinkButton extraClass='alone blue' to='/OCRScanner'>Update your subscription</LinkButton>
          <LinkButton extraClass='alone blue' to='/QRScanner'>Scan QR code of prescription</LinkButton>

        </Ticket>
      </span>
    )
  }
}
