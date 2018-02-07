import React, {Component} from 'react'
import {connect} from 'react-redux'
import imagePic from '../../content/images/tomoconner.jpg'
import {deleteCard,updateWeather,updateCurrentLocation} from '../../store/modules/actions'
import Collapsible from 'react-collapsible';
import LinkButton from '../modules/LinkButton'
import Ticket from '../modules/Ticket'
import {PrescriptionGrid} from '../modules/Card'
import ChatIntercom from '../modules/ChatIntercom'
import {fetchWeather} from '../../api/darksky'
import Autocomplete from '../createPages/NewAppointment/Autocomplete'
import {handleFocus} from '../../store/modules/actions'



// const LatLngInput = ({latlng, searchWeather, handleInputChange}) =>
// <div className='LatLngInput'>
//   <div className='inner'>
//     <span>
//       <label>Lat,Lng</label>
//       <input onChange={handleInputChange} value={latlng} type="text"/>
//     </span>
//   </div>
//
//   <div onClick={searchWeather} className="button">Override Weather Location</div>
// </div>


class Account extends Component {
  state = {
    center:''
  }

  searchWeather = center => {
    const {lat, lng} = center
    const {dispatch} = this.props
    dispatch(updateCurrentLocation({lat, lng}))
    fetchWeather(lat,lng).then((weatherType) => {
      console.log("weatherType: ",weatherType)
      dispatch(updateWeather(weatherType))
    })
  }

  deleteCard = event => this.props.dispatch(deleteCard(parseInt(event.target.id,10)))
  focusHandler = (type) => this.props.dispatch(handleFocus(type))

  render () {
    const {currentUser} = this.props
    const {latlng} = this.state
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
            <Collapsible triggerSibling={()=><span className='titleCollapse'> My Prescription</span>} transitionTime={100} trigger=" ">
              <PrescriptionGrid prescription={currentUser.prescription}/>
              <LinkButton extraClass='' to='/QRScanner'>Scan QR code of Prescription</LinkButton>
              <LinkButton extraClass='' to='/OCRScanner'>Update Prescription with OCR</LinkButton>
            </Collapsible>
            <Collapsible triggerSibling={()=><span className='titleCollapse'>My Account Details</span>} transitionTime={100} trigger=" ">
              <p>Username: {currentUser.username}</p>
              <p>Password: {currentUser.password}</p>
              <LinkButton extraClass='secondary'  to='/updateaccount'>Update Account Details</LinkButton>

              <div className='accountAutocomplete'>
                <span>Override User Location: </span>
                <Autocomplete
                  focusHandler={this.focusHandler}
                  placeholder='Override User Location'
                  onInputChanged={this.searchWeather}/>
              </div>

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
              {/* <LinkButton extraClass='' to='/OCRScanner'>Send picture of new subscription</LinkButton> */}
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
  currentUser: state.data.currentUser,
  weatherType: state.weatherType
}))(Account)
