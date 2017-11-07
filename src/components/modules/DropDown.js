import React, {Component} from 'react'
import {brandNames, lenseTypes,cardTypes,appointmentType,appointmentFor } from '../../store/modules/seed'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const options = inputText => {
  switch (inputText) {
    case 'Select Brand': return brandNames
    case 'Select Lense Type': return lenseTypes
    case 'Select Card Type': return cardTypes
    case 'Select Appointment Type': return appointmentType
    case 'Select who the appointment is for': return appointmentFor
    default: return null
  }
}

export default class DropDown extends Component {

  onChange = e => {
    const {name,handleChange} = this.props
    if(!!e.value) handleChange(e.value, name)
  }
  renderValue = option => <span>{option.label}</span>

  render () {
    const {inputText,value}= this.props
    return (
      <div >
        <Select
          clearable={false}
          valueRenderer={this.renderValue}
          placeholder=''
          options={options(inputText)}
          onChange={this.onChange}
          value={value}
        />
      </div>)
  }
}
