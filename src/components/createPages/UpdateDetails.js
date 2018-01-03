import React, {Component} from 'react'
import {connect} from 'react-redux'

import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import FormInput from '../modules/FormInput'
import LinkButton from '../modules/LinkButton'

import {updatePersonalDetails} from '../../store/modules/actions'

class UpdateDetails extends Component {
  handleForm = (formValues) => {
    const title =  formValues.inputOne
    const first_name =  formValues.inputTwo
    const last_name =  formValues.inputThree
    const address =  formValues.inputFour
    const postcode =  formValues.inputFive
    const dob =  formValues.inputSix
    this.props.dispatch(updatePersonalDetails(title,first_name,last_name,address,postcode,dob))
  }
  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/myspecsavers')
  }
  render () {
    const {currentUser} = this.props
    return (
      <span>
        <Ticket title="Update My Personal Details">
          <MiniTicket>
            <FormInput
              handleForm={this.handleForm}
              inputOne='Title'
              inputTwo='First Name'
              inputThree='Last Name'
              inputFour='Address'
              inputFive='Postcode'
              inputSix='Date of birth'

              valueOne={currentUser.title}
              valueTwo={currentUser.first_name}
              valueThree={currentUser.last_name}
              valueFour={currentUser.address}
              valueFive={currentUser.postcode}
              valueSix={currentUser.dob}

              submitName='Update Personal Details'/>
              <br/>
          </MiniTicket>
        </Ticket>
        <br/><br/>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(UpdateDetails)
