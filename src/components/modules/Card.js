import React, {Component} from 'react'
import {EventIcon, InfoIcon, MarkerIcon} from '../../content/icons/AppointmentIcons'
import AddToCalendar from 'react-add-to-calendar';
import moment from 'moment'
import Modal from 'react-modal';

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

export class AppointmentCard extends Component {
  state = { modalIsOpen: false}

  componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = () => this.setState({modalIsOpen: true});
  closeModal = () => this.setState({modalIsOpen: false});

  render () {
    const {extraClass, appointment, children} = this.props
    const time24 = moment(appointment.dateAndTime, 'HHmm A').format('HH:mm:ss')
    const date = moment(appointment.dateAndTime).format('YYYY-MM-DD')
    const event = {
      title: 'Eye Test',
      location:  appointment.address,
      startTime: moment(date + 'T' + time24),
      description: appointment.location + ' | ' + appointment.optician,
      endTime: moment(date + 'T' + time24).add(30, 'minutes')
    }
    return (
    <div className='appointmentCard'>

      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel='appointment'
        >
          <h4>Appointment Info</h4>
          <div><h2>Store - </h2><h3>{appointment.selectedStore}</h3></div>
          <div><h2>Address - </h2><h3>{appointment.address}</h3></div>
          <div><h2>Optician - </h2><h3>{appointment.optician}</h3></div>
          <div><h2>Additional Info - </h2><h3>{appointment.additional}</h3></div>
          <div><h2>Store Phone Number - </h2><a href={`tel:${appointment.phoneNumber}`}><h3>{appointment.phoneNumber}</h3></a></div>
      </Modal>

      <div className='firstRow'>
        <div className='calendar'>
          <EventIcon/>
          <AddToCalendar
            buttonLabel={moment(appointment.dateAndTime).format('llll').slice(0, - 8) + ' ' + moment(appointment.dateAndTime).format('LT')}
            event={event}
          />
        </div>
        <a target="_blank"
          href={`https://www.google.co.uk/maps/dir/specsavers ${appointment.address.substr(appointment.address.length - 12)}/${appointment.homeLocation.lat},${appointment.homeLocation.lng}`}>
          <MarkerIcon/><h3>{appointment.selectedStore}</h3>
        </a>
        <div onClick={this.openModal}><InfoIcon/> <h3>Info</h3></div>
      </div>
      {!!appointment.optician?<div className='optician'><h2>Optician</h2> <span>-</span> <h3>{appointment.optician}</h3></div>: null}
      {children}
    </div>
    )
  }
}
export const PrescriptionGrid = ({prescription, order}) =>
<div className={order? 'prescriptionGrid order' : 'prescriptionGrid'}>
  {order?<h2>Prescription</h2>: null}
  <div className='top'>Left Eye:</div>
  <div className='bottom'>
    <div className='cell'>
      <span className='bold'>D: </span>
      <span className='text'>{prescription.left_eye.D}</span>
    </div>
    <div className='cell'>
      <span className='bold'>BC: </span>
      <span className='text'>{prescription.left_eye.BC}</span>
    </div>
    <div className='cell'>
      <span className='bold'>DIA: </span>
      <span className='text'>{prescription.left_eye.DIA}</span>
    </div>
  </div>
  <div className='top'>Right Eye:</div>
  <div className='bottom'>
    <div className='cell'>
      <span className='bold'>D: </span>
      <span className='text'>{prescription.right_eye.D}</span>
    </div>
    <div className='cell'>
      <span className='bold'>BC: </span>
      <span className='text'>{prescription.right_eye.BC}</span>
    </div>
    <div className='cell'>
      <span className='bold'>DIA: </span>
      <span className='text'>{prescription.right_eye.DIA}</span>
    </div>
  </div>
</div>

export class OrderCard extends Component {
  state = { modalIsOpen: false}

  // openModal = () => this.setState({modalIsOpen: true});
  // closeModal = () => this.setState({modalIsOpen: false});

  render () {
    const {index, delivery, brand, lense, status, children, orderType, prescription, orderedOn} = this.props
    return (
      <span>


        <div className='orderCard' >
          <div className="firstRow">
            <div className='index'>{index + 1}</div>
            <div className='titles'>
              <h2>Delivery On</h2>
              {!!orderedOn?    <h2>Ordered On</h2>: null}

              <h2>Brand</h2>
              <h2>Lense Type</h2>

              {!!orderType?    <h2>Order Type</h2>: null}
              <h2>Status</h2>
            </div>
            <div className='items'>
              <h3>{delivery}</h3>
              {!!orderedOn?    <h3>{orderedOn}</h3>: null}

              <h3>{brand}</h3>
              <h3>{lense}</h3>

              {!!orderType?    <h3>{orderType}</h3>: null}
              <h3>{status}</h3>
            </div>

          </div>
          { prescription?<PrescriptionGrid prescription={prescription} order={true}/> :null }
          <div className='secondaryButtons'>
            {children}
          </div>
        </div>
      </span>
    )
  }
}


export const OrderCardDEP = ({index, delivery, brand, lense, status, children, orderType, leftEye, rightEye, orderedOn}) =>
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
