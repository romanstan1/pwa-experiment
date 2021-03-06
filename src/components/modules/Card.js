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


const CalendarModal = ({isOpen, onRequestClose, appointment, event, date, time}) =>
 <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel='appointment'
  >
    <span className='close modal' onClick={onRequestClose}></span>

    <section className='heading'>
      <h4> </h4>
      <h4> </h4>
      <br/><br/> <br/>
      <EventIcon/>
      <br/>
      <h4>{date}</h4>
      <h4>{time}</h4>
    </section>

    <br/><br/>

    <div className='button primary AddToCalendar'>
      <AddToCalendar
        buttonLabel='Add to Calendar'
        event={event}
      />
    </div>

</Modal>

const DirectionsModal = ({isOpen, onRequestClose, appointment}) =>
 <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel='appointment'
  >
  <span className='close modal' onClick={onRequestClose}></span>

  <section className='heading'>
    <br/><br/>
    <MarkerIcon/>
    <h4>{appointment.selectedStore}</h4>
  </section>

  <section>
    <br/><br/>
    <p>{appointment.address}</p>
    <br/><br/>
    <p>{appointment.phoneNumber}</p>
    <br/><br/>
  </section>


  <div className="button primary AddToCalendar">
    <a target="_blank"
      onClick={this.openModal} data-value={'directionsOpen'}
      href={`https://www.google.co.uk/maps/dir/specsavers ${appointment.address.substr(appointment.address.length - 12)}/${appointment.homeLocation.lat},${appointment.homeLocation.lng}`}
      >
        Get Directions
      </a>
  </div>

</Modal>

const InfoModal = ({isOpen, onRequestClose, appointment}) =>
 <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  contentLabel='appointment'
  >
    <span className='close modal' onClick={onRequestClose}></span>
    <section className='heading'>
      <InfoIcon/>
      <h4>Info</h4>
    </section>

    <section>
      <h2>Who's coming: </h2>
      <p>Tom O'Connor</p>
    </section>

    <section>
      <h2>Your optician will be:</h2>
      <p>{appointment.optician}</p>
    </section>

    <section>
      <h2>Additional Notes:</h2>
      <p>{appointment.additionalInfo}</p>
    </section>

    <section>
      <h2>Don't forget to bring: </h2>
      <p>
        &#8226; Any current glasses <br/>
        &#8226; You perscription <br/>
        &#8226; Any notes from a health care professional
      </p>
    </section>
</Modal>


export class AppointmentCard extends Component {
  state = {
    calenderOpen: false,
    directionsOpen: false,
    infoOpen: false
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  openModal = (e) => this.setState({[e.target.dataset.value]: true})
  closeModal = () => this.setState({calenderOpen: false, directionsOpen: false, infoOpen: false})

  render () {
    const {extraClass, appointment, children} = this.props
    const time24 = moment(appointment.dateAndTime).format('LT')
    const date = moment(appointment.dateAndTime).format('LLLL').slice(0,-8)
    const event = {
      title: 'Eye Test',
      location:  appointment.address,
      startTime: appointment.dateAndTime,
      description: appointment.selectedStore + ' | ' + appointment.optician,
      endTime: moment(appointment.dateAndTime).add(15, 'minutes')
    }

    const {calenderOpen, directionsOpen, infoOpen} = this.state
    return (
    <div className='appointmentCard'>

      <CalendarModal
        isOpen={calenderOpen}
        onRequestClose={this.closeModal}
        appointment={appointment}
        date={date}
        time={time24}
        event={event}
      />
      <DirectionsModal
        isOpen={directionsOpen}
        onRequestClose={this.closeModal}
        appointment={appointment}
      />
      <InfoModal
        isOpen={infoOpen}
        onRequestClose={this.closeModal}
        appointment={appointment}
      />

      <div className='firstRow'>
        <div>
          <EventIcon/>
          <h3>{moment(appointment.dateAndTime).format('llll').slice(0, - 8) + ' ' + moment(appointment.dateAndTime).format('LT')}</h3>
          <span onClick={this.openModal} data-value={'calenderOpen'}></span>
        </div>
        <div>
          <MarkerIcon/>
          <h3>{appointment.selectedStore}</h3>
          <span onClick={this.openModal} data-value={'directionsOpen'}></span>
        </div>
        <div>
          <InfoIcon/>
          <h3>Info</h3>
          <span onClick={this.openModal} data-value={'infoOpen'}></span>
        </div>
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
