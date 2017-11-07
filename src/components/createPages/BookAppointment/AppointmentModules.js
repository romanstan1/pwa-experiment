import React from 'react'
import {humanize} from 'underscore.string'
import SelectStrip from '../../modules/SelectStrip'
import DropDown from '../../modules/DropDown'

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

export const DefineSelectStrip = ({name, value, giveSelections, items, noScroll}) =>
  <div>
    <span className='appointmentInput'><label>{humanize(name)}</label></span>
    <SelectStrip noScroll={noScroll} value={value} name={name} giveSelections={giveSelections} items={items}/>
  </div>

export const NoAppointments = ({when}) =>
  <div>
    <span className='appointmentInput'><label></label></span>
    <div className='noAppointments'>
      There are no appointments available {when === 'date'?
      <span> at this branch</span> : <span> at this time</span>}
    </div>
  </div>

export const SelectAppointmentType = ({handleTypeChange, appointmentType}) =>
  <span className='formInput'>
    <form>
      <span className='nested'>
        <label style={{marginTop:0}}>Select Appointment Type</label>
        <DropDown
          handleChange={handleTypeChange}
          inputText='Select Appointment Type'
          value={appointmentType}/>
        </span>
    </form>
  </span>

export const SelectWhoAppointmentIsFor = ({handleAppointmentFor, appointmentFor}) =>
  <span className='formInput' style={{paddingTop:0}}>
    <form style={{paddingTop:0,paddingBottom:0}}>
      <span className='nested'>
        <label style={{marginTop:0}}>Select who the appointment is for</label>
        <DropDown
          handleChange={handleAppointmentFor}
          inputText='Select who the appointment is for'
          value={appointmentFor}/>
      </span>
    </form>
  </span>

export const AdditionalInfo = ({handleAdditionalInfo}) =>
  <span className='appointmentInput'>
    <label>Enter any additional information</label>
    <textarea rows="4" cols="50" onChange={handleAdditionalInfo} />
  </span>


// export const getAvailableTimes = (appointmentDate, appointmentDates) => {
//   let appointmentTime
//   if(!!appointmentDates) appointmentTime = appointmentDates.reduce((times, appointment) => {
//     if(appointmentDate === appointment.date) times.push(appointment.times)
//     return times
//   },[])[0]
//   return appointmentTime
// }
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
