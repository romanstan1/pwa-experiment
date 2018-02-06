import React, {Component} from 'react'
import specsaversLogo from '../../content/specsavers-logo.svg'
import { Offline } from 'react-detect-offline';


export default class Ticket extends Component {
  render () {
    const {children} = this.props
    return (
      <div className='ticket'>
        <div className='ticketTitle'><img src={specsaversLogo} alt="Logo" height="36" width="52"/></div>
        <Offline> <div className='offline'>You are offline, some information may be out of date</div></Offline>
        <div className='ticketTitleBody'> {children} </div>
      </div>)
  }
}
