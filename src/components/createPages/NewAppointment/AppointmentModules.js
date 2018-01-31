import React, {Component} from 'react'
import {humanize} from 'underscore.string'
import SelectStrip from '../../modules/SelectStrip'
import DropDown from '../../modules/DropDown'
import {brandNames, lenseTypes,cardTypes,appointmentType,appointmentFor } from '../../../store/modules/seed'
import moment from 'moment'

export const BookSomeoneElse = ({handleSecondPerson}) => <div style={{paddingLeft:'40px'}}>
  <span className='appointmentInput'>
    <label className='someoneElse'>Title</label>
    <input name='title' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label className='someoneElse'>First Name</label>
    <input name='first_name' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label className='someoneElse'>Last Name</label>
    <input name='last_name' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label className='someoneElse'>Date of Birth</label>
    <input name='dob' onChange={handleSecondPerson} />
  </span>
</div>

export const DefineSelectStrip = ({name, value, giveSelections, items, noScroll}) =>
<div>
  <span className='appointmentInput'><label>{humanize(name)}</label></span>
  <SelectStrip noScroll={noScroll} value={value} name={name} giveSelections={giveSelections} items={items}/>
</div>



export const StoreStrip = ({selectedStore, handleStoreSelect, availableStores}) =>
<div className='storeStrip'>
  <div className='strip'>
    {availableStores.map((store, index) =>
      <div key={index} className={selectedStore === store.name? 'store selected':'store'} onClick={() => handleStoreSelect(store)} >
        <span className='name'>{store.name}</span>
        <span className='distance'>{store.proximity.distance.text}</span>
      </div>
    )}
  </div>
</div>

export const DateStrip = ({selectedDate,handleDateSelect, availableDates}) => {
  return (<div className='dateStrip'>
    <span>Date & Time</span>
    <div className='strip'>
      { typeof availableDates === 'object'? availableDates.map((day, index) =>
        <div key={index} className={selectedDate === day.date? 'date selected':'date'} onClick={() => handleDateSelect(day.date)} >
          <span className='day'>{moment(day.date, 'MMM DD YYYY').format('llll').slice(0, 3)}</span>
          <span>{moment(day.date, 'MMM DD YYYY').format('ll').slice(0, -6)}</span>
        </div>
      ):null}
    </div>
  </div>)
}

export const AppointmentSummary = (details) => {
  return (
    <div className='AppointmentSummary'>
      <h2>SUMMARY HERE</h2>
      {/* appointment info */}
      <div>{details.selectedStore}</div>
      <div>{details.appointmentType}</div>
      <div>{details.appointmentDate}</div>
      <div>{details.appointmentTime}</div>
      <div>{details.appointmentFor}</div>
      <div>{details.additionalInfo}</div>
      {/* store info */}
      <div>{details.phoneNumber}</div>
      <div>{details.address}</div>
    </div>
  )
}


export class TimeStrip extends Component {
  state = {period: 'Morning'}
  handleButton = (e) => this.setState({period: e.target.dataset.value})
  render() {
    const {selectedTime,handleTimeSelect, availableTimes} = this.props
    return (<div className='timeStrip'>
      <div className='timeButtons'>
        {['Morning','Afternoon','Evening'].map((button, i) =>
          <span className={this.state.period === button? 'selected': null}
            key={i}
            onClick={this.handleButton}
            data-value={button}>{button}</span>
        )}
      </div>
      <div className='strip'>
        {availableTimes.map((time, index) =>
          <div key={index} className={selectedTime === time? 'time selected':'time'} onClick={() => handleTimeSelect(time)} >
            <span className='time'>{time}</span>
          </div>
        )}
      </div>
    </div>)
  }
}


export const AppointmentText = ({text}) =>
  <div className='noAppointments'>
    <div>
      {text}
    </div>
  </div>

export const SelectAppointmentType = ({handleTypeChange, selectedAppointmentType}) =>
  <div className='selectAppointmentType'>
    <div className='label'>What kind of appointment?</div>
    <div className='row'>
      {appointmentType.map((item, index) =>
        <span className={selectedAppointmentType === item.value? 'active':''} key={index} onClick={handleTypeChange} data-value={item.value}>{item.label}</span>)}
    </div>
  </div>

export const SelectWhoAppointmentIsFor = ({handleAppointmentFor, selectedAppointment}) =>
  <div className='selectAppointmentType'>
    <div className='label'>Select Who Appointment Is For</div>
    <div className='row'>
      {appointmentFor.map((item, index) =>
        <span className={selectedAppointment === item.value? 'active':''} key={index} onClick={handleAppointmentFor} data-value={item.value}>{item.label}</span>)}
    </div>
  </div>

export const AdditionalInfo = ({handleAdditionalInfo}) =>
  <span className='appointmentInput'>
    <label>Enter any additional information</label>
    <textarea rows="4" cols="50" onChange={handleAdditionalInfo} />
  </span>

export const getAvailableTimes = (appointmentDate, availableDates) => {
  let appointmentTime
  if(!!availableDates) appointmentTime = availableDates.reduce((times, appointment) => {
    if(appointmentDate === appointment.date) times.push(appointment.times)
    return times
  },[])[0]
  return appointmentTime
}

export const getAppointmentDates = (selectedStore, availableStores) => {
  const appointmentDates = availableStores.reduce((date, store) => {
    if(selectedStore === store.name) date.push(store.availableDates)
    return date
  },[])[0]
  return appointmentDates
}
