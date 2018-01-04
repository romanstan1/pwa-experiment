import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import FormInput from '../modules/FormInput'
import {updateSubscription} from '../../store/modules/actions'

class UpdateSubscription extends Component {
  handleForm = (formValues) => {
    const brand =  formValues.inputOne
    const date =  formValues.inputTwo
    const lenseType =  formValues.inputThree
    this.props.dispatch(updateSubscription(brand,date,lenseType))
  }
  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/myspecsavers')
  }
  render () {
    const {currentUser} = this.props
    return (
      <span>
        <Ticket title="Update My Subscription">
          <MiniTicket title="Update My Subscription">
            <FormInput
              handleForm={this.handleForm}
              inputOne='Select Brand'
              inputTwo='Date'
              inputThree='Select Lense Type'
              valueOne={currentUser.subscription.brand}
              valueTwo={currentUser.subscription.next_arrival_date}
              valueThree={currentUser.subscription.type}
              submitName='Update Subscription'/>
          </MiniTicket>
        </Ticket>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(UpdateSubscription)
