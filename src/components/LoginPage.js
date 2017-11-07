import React, {Component} from 'react'
import {connect} from 'react-redux'

import {login} from '../store/modules/actions'

import Ticket from './modules/Ticket'
import MiniTicket from './modules/MiniTicket'
import FormInput from './modules/FormInput'

class LoginPage extends Component {

  handleForm = (formValues) => {
    const username =  formValues.inputOne
    const password =  formValues.inputTwo
    this.props.dispatch(login(username,password))
  }

  componentDidUpdate = () => {
    const {currentUser, history} = this.props
    if(currentUser) history.push('/myspecsavers')
  }

  render () {
    return (
      <span>
        <Ticket title='Log In'>
          <MiniTicket>
            <div className='goodAfternoon'>Good afternoon. Please log in</div>
            <br/>
            <FormInput
              handleForm={this.handleForm}
              inputOne='Username'
              inputTwo='Password'
              submitName='Login'/>
            <br/>
          </MiniTicket>
        </Ticket>
      </span>
    )
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(LoginPage)
