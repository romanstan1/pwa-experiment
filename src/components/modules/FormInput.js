import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import DropDown from './DropDown'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export class DatePickerParent extends Component {
  handleChange = (moment) => {
    const {handleChange, inputName} = this.props
    handleChange(moment,inputName)
  }

  render () {
    const {value} = this.props
    return <DatePicker
        dateFormat="DD/MM/YYYY"
        selected={typeof value ==='object'? value: moment(value,'MMMDDYYYY')}
        onChange={this.handleChange}
       />
  }
}


const Input = ({inputText,inputName,handleChange,value}) => {
  switch(inputText){
    case 'Date': return <DatePickerParent
      inputName={inputName}
      value={value}
      handleChange={handleChange}/>
    case 'Select Brand': case 'Select Lense Type': case 'Select Card Type': return <DropDown
      handleChange={handleChange}
      inputText={inputText}
      name={inputName}
      value={value}/>
    case undefined: return null
    default: return <input
      type="text"
      name={inputName}
      onChange={handleChange}
      value={value}/>
  }
}

export default class FormInput extends Component {
  getInitialState = () => {
    const {valueOne,valueTwo,valueThree,valueFour,valueFive,valueSix} = this.props
    return {
      inputOne:valueOne || '',
      inputTwo:valueTwo || '',
      inputThree:valueThree || '',
      inputFour:valueFour || '',
      inputFive:valueFive || '',
      inputSix:valueSix || ''
    }
  }
  state = this.getInitialState()

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleForm(this.state)
  }
  handleChange = (event, inputName) => {
    if(!!event.target) this.setState({ [event.target.name]:event.target.value })
    else this.setState({ [inputName]:event })
  }

  render () {
    const {submitName,inputOne,inputTwo,inputThree,inputFour,inputFive,inputSix} = this.props
    return (
      <span className='formInput'>
        <form onSubmit={this.handleSubmit}>

          <span className='nested'>
            <label>{inputOne}</label>
            <Input inputText={inputOne} inputName='inputOne' value={this.state.inputOne} handleChange={this.handleChange}/>
          </span>

          <span className='nested'>
            <label>{inputTwo}</label>
            <Input inputText={inputTwo} inputName='inputTwo' value={this.state.inputTwo} handleChange={this.handleChange}/>
          </span>

          {!!inputThree?
          <span className='nested'>
            <label>{inputThree}</label>
            <Input inputText={inputThree} inputName='inputThree' value={this.state.inputThree} handleChange={this.handleChange}/>
          </span>:null}

          {!!inputFour?
          <span className='nested'>
            <label>{inputFour}</label>
            <Input inputText={inputFour}  inputName='inputFour' value={this.state.inputFour} handleChange={this.handleChange}/>
          </span>:null}

          {!!inputFive?
          <span className='nested'>
            <label>{inputFive}</label>
            <Input inputText={inputFive} inputName='inputFive' value={this.state.inputFive} handleChange={this.handleChange}/>
          </span>:null}

          {!!inputSix?
          <span className='nested'>
            <label>{inputSix}</label>
            <Input inputText={inputSix} inputName='inputSix' value={this.state.inputSix} handleChange={this.handleChange}/>
          </span>:null}

          <span className='nested'>
            <input type="submit" value={submitName} />
          </span>
        </form>
      </span>
    )
  }
}
