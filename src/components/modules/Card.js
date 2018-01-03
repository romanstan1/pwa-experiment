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

export const AppointmentCard = ({location, date, time, optician, children}) =>
  <div className='appointmentCard'>
    <div className='firstRow'>
      <div><EventIcon/><h3>{date}</h3></div>
      <div><MarkerIcon/><h3>{location}</h3></div>
      <div><InfoIcon/> <h3>{time}</h3></div>
    </div>
    {!!optician?<div className='optician'><h2>Optician</h2> <span>-</span> <h3>{optician}</h3></div>: null}
    {children}
  </div>


export const OrderCard = ({index, delivery, brand, lense, status,   children,   orderType, leftEye, rightEye, orderedOn}) =>
<span>
  <div className='orderCard'>
    <div className="firstRow">
      <div className='index'>{index + 1}</div>
      <div className='titles'>
        <h2>Delivery On</h2>
        {!!orderedOn?    <h2>Ordered On</h2>: null}

        <h2>Brand</h2>
        <h2>Lense Type</h2>

        {!!orderType?    <h2>Order Type</h2>: null}
        {!!leftEye && !!rightEye? <h2>Perscription</h2>: null}
        <h2>Status</h2>
      </div>
      <div className='items'>
        <h3>{delivery}</h3>
        {!!orderedOn?    <h3>{orderedOn}</h3>: null}

        <h3>{brand}</h3>
        <h3>{lense}</h3>

        {!!orderType?    <h3>{orderType}</h3>: null}
        {!!leftEye && !!rightEye? <h3>Left: {leftEye} | Right: {rightEye}</h3>: null}

        <h3>{status}</h3>
      </div>
    </div>
    <div className='secondaryButtons'>
      {children}
    </div>
  </div>
</span>
