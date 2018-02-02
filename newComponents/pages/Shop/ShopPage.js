import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import MiniTicket from './modules/MiniTicket'
import { Link } from 'react-router-dom'


export default class ShopPage extends Component {

  render () {
    return (
      <span >
        <Ticket title="Shop">
          <MiniTicket>
            <Link className='scanQRCode' to='OCRScanner'>Express Re-order</Link>
          </MiniTicket>
          <MiniTicket title="Recommendations">
            <br/>
            <br/>
            <br/>
            <br/>
          </MiniTicket>
          <MiniTicket title="Men's Glasses">
            <br/>
            <br/>
            <br/>
            <br/>
          </MiniTicket>
          <MiniTicket title="Womens's Glasses">
            <br/>
            <br/>
            <br/>
            <br/>
          </MiniTicket>
        </Ticket>
      </span>
    )
  }
}
