import React, {Component} from 'react'
import specsaversLogo from '../../content/specsavers-logo.svg'


export default class Ticket extends Component {
  render () {
    const {title, children} = this.props
    return (
      <div className='ticket'>
        {/* <div className='ticketTitle'>{title}</div> */}
        <div className='ticketTitle'><img src={specsaversLogo} alt="Logo" height="36" width="52"/></div>
        <div className='ticketTitleBody'> {children} </div>
      </div>)
  }
}
