import React from 'react'
import {humanize} from 'underscore.string'
import SelectStrip from '../../modules/SelectStrip'
import DropDown from '../../modules/DropDown'
import {brandNames, lenseTypes,cardTypes,appointmentType,appointmentFor } from '../../../store/modules/seed'

export const BookSomeoneElse = ({handleSecondPerson}) => <div style={{paddingLeft:'40px'}}>
  <span className='appointmentInput'>
    <label>Title</label>
    <input name='title' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label>First Name</label>
    <input name='first_name' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label>Last Name</label>
    <input name='last_name' onChange={handleSecondPerson} />
  </span>
  <span className='appointmentInput'>
    <label>Date of Birth</label>
    <input name='dob' onChange={handleSecondPerson} />
  </span>
</div>

export const DefineSelectStrip = ({name, value, giveSelections, items, noScroll,newSelectedStore}) => {
// console.log("newSelectedStore: ",newSelectedStore)
  return <div>
    <span className='appointmentInput'><label>{humanize(name)}</label></span>
    <SelectStrip newSelectedStore={newSelectedStore} noScroll={noScroll} value={value} name={name} giveSelections={giveSelections} items={items}/>
  </div>
}

export const StoreStrip = ({selectedStore, giveSelections, availableStores}) =>
<div className='storeStrip'>
  <span>Select Store</span>
  <div className='strip'>
    {availableStores.map((store, index) =>
      <div key={index} className={selectedStore === store.name? 'store selected':'store'} onClick={() => giveSelections(store)} >
        <span className='name'>{store.name}</span>
        <span className='distance'>{store.proximity.distance.text}</span>
      </div>
    )}
  </div>
</div>

export const AppointmentText = ({text}) =>
  <div className='noAppointments'>
    <div>
      {text}
    </div>
  </div>

export const SelectAppointmentType = ({handleTypeChange, selectedAppointmentType}) =>
  <div className='selectAppointmentType'>
    <div className='label'>Select Appointment Type</div>
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
