import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import FormInput from '../modules/FormInput'
import {updatePerscription} from '../../store/modules/actions'

class UpdatePerscription extends Component {
  handleForm = (formValues) => {
    const left_eye =  formValues.inputOne
    const right_eye =  formValues.inputTwo
    this.props.dispatch(updatePerscription(left_eye,right_eye))
  }
  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/myspecsavers')
  }
  render () {
    const {currentUser} = this.props
    return (
      <span>
        <Ticket title="Update My Prescription">
          <MiniTicket title="Update My Prescription">
            <FormInput
              handleForm={this.handleForm}
              inputOne='Left Eye'
              inputTwo='Right Eye'
              valueOne={currentUser.left_eye}
              valueTwo={currentUser.right_eye}
              submitName='Update Prescription'/>
          </MiniTicket>
        </Ticket>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(UpdatePerscription)
