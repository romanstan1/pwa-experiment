import React, {Component} from 'react'
import {EventIcon, InfoIcon, MarkerIcon} from '../../content/icons/AppointmentIcons'

export default class Card extends Component {
  render () {
    const {title,children,onClick,index} = this.props
    let {align} = this.props
    if(!align) align = 'left'
    return (
      <div className='cardStyle' >
        {!!onClick?  <span id={index} className='close' onClick={onClick} style={{cursor:'pointer'}}></span> : null }
        {!!title?<div>{title}</div>:null}
        <div>{children}</div>
      </div>)
  }
}


export const AppointmentCard = ({location, date, time}) =>
<div className='appointmentCard'>
  <div>
    <div><MarkerIcon/><h3>{location}</h3></div>
    <div><EventIcon/><h3>{date}</h3></div>
    <div><InfoIcon/> <h3>{location}</h3></div>
  </div>
</div>

export const OrderCard = ({index, delivery, brand, lense, status}) =>
<div className='orderCard'>
  <div className='index'>{index + 1}</div>
  <div className='titles'>
    <h2>Delivery</h2>
    <h2>Brand</h2>
    <h2>Lense Type</h2>
    <h2>Status</h2>
  </div>
  <div className='items'>
    <h3>{delivery}</h3>
    <h3>{brand}</h3>
    <h3>{lense}</h3>
    <h3>{status}</h3>
  </div>
</div>
