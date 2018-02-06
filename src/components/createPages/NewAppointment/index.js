import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../../modules/Ticket'
import NewGmap from './NewGmap'
import {fetchNearbyPlaces} from '../../../api/google'
import {bookAppointment, confirmAppointment,availableStoresAtLocation} from '../../../store/modules/actions'
import {fetchAppointmentsData} from '../../../api/appointments'
import {opticianNames,random} from '../../../store/modules/seed'
import * as firebase from 'firebase';
import './style.css'
import moment from 'moment'
import {AppointmentCard} from '../../modules/Card'
import { Offline, Online } from 'react-detect-offline';
import LinkButton from '../../modules/LinkButton'
import {BookSomeoneElse,
  SelectAppointmentType,
  SelectWhoAppointmentIsFor,
  AdditionalInfo,
  getAvailableTimes,
  AppointmentText,
  AppointmentSummary,
  StoreStrip, DateStrip, TimeStrip} from './AppointmentModules'
require("firebase/firestore");


function scrollToBottom(history) {
  history.scrollTop = history.scrollTop + 3
  if(history.scrollTop < history.scrollHeight - history.clientHeight) {
    setTimeout(() => scrollToBottom(history), 5)
  }
}

function runScroll() {
  scrollTo(document.body, 0, 600);
}
// var scrollme;
// scrollme = document.querySelector("#scrollme");
// scrollme.addEventListener("click",runScroll,false)

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}






class BookAppointment extends Component {

  state = {
    selectedStore:'',
    appointmentDate:'',
    appointmentTime: '',
    appointmentType:'',
    appointmentFor:'',
    additionalInfo:'',
    secondPerson:{},
    availableDates:[],
    center:{},
    selectedStoreId:null,
    phoneNumber:null,
    homeLocation:null,
    address:null,
    searching:'false'
  }

  handleTypeChange = event => {
    this.setState({
      appointmentType:event.target.dataset.value,
      selectedStore:'',
      selectedStoreId:null,
      appointmentDate:'',
      appointmentFor:'',
      availableDates:[],
      center:{},
      appointmentTime: ''})
    this.props.dispatch(availableStoresAtLocation([]))
  }
  componentDidMount() {
    this.props.dispatch(availableStoresAtLocation([]))
  }

  handleStoreSelect = (store) => {
    this.setState({
      selectedStore: store.name,
      appointmentDate:'',
      appointmentTime: '',
      appointmentFor:'',
      selectedStoreId:store.place_id,
      phoneNumber: store.phone_number,
      homeLocation: store.proximity_to_location,
      address:store.fullAddress
    })
    this.getAppointmentData(store.place_id)
  }

  getAppointmentData = placeId => {
    this.setState({availableDates: 'loader'})
    fetchAppointmentsData(placeId)
    .then(res => {
      if(!!res.availableDates) this.setState({availableDates: res.availableDates})
      else this.setState({availableDates: 'none'})
    })
  }

  // handles searches and fetches store data from google for stores on gmaps
  searchForNearbyPlaces = (value) => {
    this.setState({searching: 'true'})
    fetchNearbyPlaces(value)
    .then(stores => {
      this.setState({searching: 'false'})
      console.log("stores: ",stores)
      this.props.dispatch(availableStoresAtLocation(stores))
    })
    .catch(error => {
      console.log("error: no nearby places",error)
      this.setState({searching: 'error'})
    })
  }

  handleDateSelect = (date) => {
    this.setState({
      appointmentDate:date,
      appointmentTime:'',
      appointmentFor:''
    })
  }

  handleTimeSelect = (time) => {
    this.setState({
      appointmentTime:time,
      appointmentFor:''
    })
  }

  // extra input detail handlers
  handleAppointmentFor = event => this.setState({appointmentFor:event.target.dataset.value})
  handleAdditionalInfo = ({target}) => this.setState({additionalInfo:target.value})
  handleSecondPerson = ({target}) => this.setState({secondPerson:{ ...this.state.secondPerson,[target.name]:target.value}})

  bookNewAppointment = () => {

    const fs = firebase.firestore();
    const date = this.state.appointmentDate
    const time = this.state.appointmentTime
    const dateAndTime = moment(date + ' ' + time, 'lll').format('llll')
    const optician = random(opticianNames)
    const newAppointment = {
      selectedStore: this.state.selectedStore,
      dateAndTime: dateAndTime,
      address: this.state.address,
      optician:optician,
      homeLocation: this.state.homeLocation,
      placeId:this.state.selectedStoreId,
      type:this.state.appointmentType,
      for: this.state.appointmentFor,
      additional:this.state.additionalInfo,
      phoneNumber: this.state.phoneNumber
    }
    fs.collection("appointments").add(newAppointment)
    .then(docRef => {
      // console.log("Document written with ID: ", docRef.id)
      newAppointment.uuid = docRef.id
      this.props.dispatch(confirmAppointment(newAppointment))
      this.props.history.push(`/confirmappointment`)
    })
    .catch(error => console.error("Error adding document: ", error))
  }

  render () {

    const {searching,additionalInfo,
      appointmentFor,availableDates,appointmentDate,
      appointmentTime,selectedStoreId,selectedStore} = this.state
    const {availableStores, currentUser} = this.props
    if(!!availableDates && availableDates !== 'none' && availableDates !== 'loader' && availableDates.length > 0) {
      var availableTimes = getAvailableTimes(appointmentDate, availableDates)
    }
    return (
      <Ticket>
        <div className='bookappointment'>
          <Online>

            <h2>Book Appointment</h2>

            <SelectAppointmentType
              selectedAppointmentType={this.state.appointmentType}
              handleTypeChange={this.handleTypeChange}
            />

            { !!this.state.appointmentType?
              <span>
                <label className='selectStoreLabel'>Select Store</label>
                <NewGmap
                  currentLocation={currentUser.currentLocation}
                  clickStore={this.handleStoreSelect}
                  selectedStoreId={selectedStoreId}
                  fetchNearbyPlaces={this.searchForNearbyPlaces}
                />
              </span>
              :null
            }

            {!!availableStores && !!availableStores[0]?
              <StoreStrip
                selectedStore={selectedStore}
                handleStoreSelect={this.handleStoreSelect}
                availableStores={availableStores}
              />
              :null}

              {searching === 'true'? <AppointmentText text='Loading...'/> : null }
              {searching === 'error'? <AppointmentText text='No stores nearby. Check your internet connection and search again'/> : null }

              {!!availableDates && !!availableDates.length && availableDates !== 'none' && availableDates !== 'loader'?
              <DateStrip
                selectedDate={this.state.appointmentDate}
                handleDateSelect={this.handleDateSelect}
                availableDates={availableDates}
              />
              :null}

              {!!availableDates && availableDates === 'loader'? <AppointmentText text='Loading...'/>:null}
              {!!availableDates && availableDates === 'none'? <AppointmentText text='No appointments currently available at this store'/>:null}

              {!!availableTimes && !!availableTimes.length?
                <TimeStrip
                  selectedTime={this.state.appointmentTime}
                  handleTimeSelect={this.handleTimeSelect}
                  availableTimes={availableTimes}
                />
                :null}

                {appointmentTime !== ''?
                <span>
                  <SelectWhoAppointmentIsFor
                    selectedAppointment={this.state.appointmentFor}
                    handleAppointmentFor={this.handleAppointmentFor}/>

                    { appointmentFor ==='Someone else'?
                    <BookSomeoneElse handleSecondPerson={this.handleSecondPerson}/>
                    : null}
                  </span>
                  : null }

                  { !!appointmentFor?
                    <span>
                      <AdditionalInfo handleAdditionalInfo={this.handleAdditionalInfo}/><br/>
                      <div className='appointmentSummary'>
                        <h2>{`${this.props.currentUser.first_name}'s Appointment Summary`}</h2>
                        <AppointmentCard appointment={this.state} />
                      </div>
                      <br/>
                      <div onClick={this.bookNewAppointment} className='button primary'> Book appointment</div>
                    </span> : null
                  }
          </Online>
          <Offline>
            <div className='offlineBookAppointment'>
              You need to be online to book an appointment <br/><br/>
              <LinkButton to='/myappointments'>My Appointments</LinkButton>
            </div>
          </Offline>

          </div>
      </Ticket>
    )
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser,
  availableStores: state.appointments.availableStores
}))(BookAppointment)
