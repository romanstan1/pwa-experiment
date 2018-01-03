import React, {Component} from 'react'
import {connect} from 'react-redux'

import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import FormInput from '../modules/FormInput'
import LinkButton from '../modules/LinkButton'

import {updateAccountDetails} from '../../store/modules/actions'

class UpdateAccount extends Component {
  handleForm = (formValues) => {
    const username =  formValues.inputOne
    const password =  formValues.inputTwo
    this.props.dispatch(updateAccountDetails(username,password))
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
              inputOne='Username'
              inputTwo='Password'
              valueOne={currentUser.username}
              valueTwo={currentUser.password}
              submitName='Update Account Details'/>
              <br/>
          </MiniTicket>
        </Ticket>
        <br/><br/>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(UpdateAccount)
