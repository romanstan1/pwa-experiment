import React, {Component} from 'react'
import {connect} from 'react-redux'
import imagePic from '../../content/images/tomoconner.jpg'
import {deleteCard} from '../../store/modules/actions'
import Collapsible from 'react-collapsible';
import LinkButton from '../modules/LinkButton'
import Ticket from '../modules/Ticket'
import ChatIntercom from '../modules/ChatIntercom'

// const objectFilter = (obj, predicate) => // returns a filtered object
//   Object.keys(obj).filter(key => predicate(obj[key]))
//   .reduce((res, key) => {
//     return res[key] = obj[key],res
//   }, {})

class Account extends Component {
  deleteCard = event => this.props.dispatch(deleteCard(parseInt(event.target.id,10)))
  render () {
    const {currentUser} = this.props
    return (
      <span>
        <Ticket title="Account Details">
          <div className="notificationCard">
            <div className='welcomeMessage'>My Account</div>
            <div className='headerBar'>
              <div className='profileName'>
                {currentUser.first_name} <br/>
                {currentUser.last_name}
              </div>
              <span><img src={imagePic} alt="Profile"/></span>
            </div>
            <Collapsible triggerSibling={()=><span className='titleCollapse'> My Perscription</span>} transitionTime={100} trigger=" ">
              <p>Left eye: {currentUser.left_eye}</p>
              <p>Right eye: {currentUser.right_eye}</p>
              <LinkButton extraClass='' to='/QRScanner'>Send Picture of Perscription</LinkButton>
              <LinkButton extraClass='secondary' to='/updateperscription'>Update Perscription</LinkButton>
            </Collapsible>
            <Collapsible triggerSibling={()=><span className='titleCollapse'>My Account Details</span>} transitionTime={100} trigger=" ">
              <p>Username: {currentUser.username}</p>
              <p>Password: {currentUser.password}</p>
              <LinkButton extraClass='secondary'  to='/updateaccount'>Update Account Details</LinkButton>
            </Collapsible>
            <Collapsible triggerSibling={()=><span className='titleCollapse'> My Payment Details</span>} transitionTime={100} trigger=" ">

              {currentUser.payment_cards.map((card, index) =>
                  <p key={index}> {card.type} - {card.number} <span id={index} className='close' onClick={this.deleteCard} style={{cursor:'pointer'}}></span></p>
              )}
              <LinkButton extraClass='secondary'  to='/addcard'>Add Card</LinkButton>
            </Collapsible>
            <Collapsible triggerSibling={()=><span className='titleCollapse'>My Personal Details</span>} transitionTime={100} trigger=" ">
              <p>Title: {currentUser.title}</p>
              <p>First Name: {currentUser.first_name}</p>
              <p>Last Name: {currentUser.last_name}</p>
              <p>Address: {currentUser.address}</p>
              <p>Postcode: {currentUser.postcode}</p>
              <p>Date of birth: {currentUser.dob}</p>
                <LinkButton extraClass='secondary' to='/updatedetails'>Update Personal Details</LinkButton>
            </Collapsible>
            <Collapsible triggerSibling={()=><span className='titleCollapse'> My Subscription</span>} transitionTime={100} trigger=" ">
              <p>Brand: {currentUser.subscription.brand}</p>
              <p>Next Scheduled Order Date:{currentUser.subscription.next_arrival_date}</p>
              <p>Lense Type: {currentUser.subscription.type}</p>
              <p>Postcode: {currentUser.postcode}</p>
                <LinkButton extraClass='secondary' to='/updatesubscription'>Update Subscription</LinkButton>
            </Collapsible>
          </div>
        </Ticket>
        <br/>
        <ChatIntercom/>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(Account)
