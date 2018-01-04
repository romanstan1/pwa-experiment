import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import LinkButton from './modules/LinkButton'
import MiniTicket from './modules/MiniTicket'

export default class ErrorPage extends Component {

  render () {
    return (
      <span className='full-page'>
        <Ticket title='404 ERROR'>
          <MiniTicket>
            <div className='pagenotfound'> PAGE NOT FOUND </div>
            <br/>
            <span style={{fontSize:'0px'}}>
              <LinkButton to='/homereel'>Go to Home</LinkButton>
            </span>
            <br/>
          </MiniTicket>
        </Ticket>
      </span>
    )
  }
}
