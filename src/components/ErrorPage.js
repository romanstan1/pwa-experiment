import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import LinkButton from './modules/LinkButton'

export default class ErrorPage extends Component {

  render () {
    return (
      <span className='full-page'>
        <Ticket title='404 ERROR'>
          <div> PAGE NOT FOUND </div>
          <br/>
          <span style={{fontSize:'0px'}}>
            <LinkButton to='/'>Go to - Home</LinkButton>
          </span>
          <br/>
        </Ticket>
      </span>
    )
  }
}
