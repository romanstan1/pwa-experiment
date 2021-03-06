import React, {Component} from 'react'
import {connect} from 'react-redux'
import MiniTicket from '../modules/MiniTicket'
import Ticket from '../modules/Ticket'
import FormInput from '../modules/FormInput'
import {addCard} from '../../store/modules/actions'

class AddCard extends Component {
  handleForm = (formValues) => {
    const cardType =  formValues.inputOne
    const cardNumber =  formValues.inputTwo
    this.props.dispatch(addCard(cardType,cardNumber))
  }
  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/mydetails')
  }
  render () {
    return (
      <span>
        <Ticket title="Add a Payment Card">
          <MiniTicket title="Add a Payment Card">
            <FormInput
              handleForm={this.handleForm}
              inputOne='Select Card Type'
              inputTwo='Input Card Number'
              submitName='Add Card'/>
              <br/>
          </MiniTicket>
        </Ticket>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(AddCard)
