import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import FormInput from '../modules/FormInput'
import {newOrder} from '../../store/modules/actions'

class NewOrder extends Component {
  handleForm = (formValues) => {
    const brand =  formValues.inputOne
    const lenseType =  formValues.inputTwo
    this.props.dispatch(newOrder(brand,lenseType))
  }
  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/myorders')
  }
  render () {
    const {currentUser} = this.props
    let valueOne, valueTwo
    if(!!currentUser.orders[0]) {
      valueOne = currentUser.orders[currentUser.orders.length - 1].brand
      valueTwo = currentUser.orders[currentUser.orders.length - 1].type
    }
    return (
      <span>
        <Ticket title="Orders">
          <MiniTicket title="Place a New Order">
            <FormInput
              handleForm={this.handleForm}
              inputOne='Select Brand'
              inputTwo='Select Lense Type'
              valueOne={valueOne}
              valueTwo={valueTwo}
              submitName='Place Order'/>
              <br/>
          </MiniTicket>
        </Ticket>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(NewOrder)
