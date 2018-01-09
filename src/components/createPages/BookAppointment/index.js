import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../../modules/Ticket'
import {BookSomeoneElse,SelectAppointmentType,
  SelectWhoAppointmentIsFor,AdditionalInfo, getAvailableTimes, AppointmentText, StoreStrip, DateStrip, TimeStrip} from './AppointmentModules'
import NewGmap from './NewGmap'
import LinkButton from '../../modules/LinkButton'
import {bookAppointment,availableStoresAtLocation} from '../../../store/modules/actions'
import underscore from 'underscore'
import {fetchNearbyPlaces} from '../../../api/google'
import {fetchAppointmentsData} from '../../../api/appointments'
import MiniTicket from '../../modules/MiniTicket'

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
  handleBookAppointment = () => {
    const idNumber= underscore.random(1,999999)
    const {history,dispatch} = this.props
    dispatch(bookAppointment(this.state,idNumber))
    history.push(`/confirmappointment`)
  }

  getAppointmentData = placeId => {
    this.setState({availableDates: 'loader'})
    fetchAppointmentsData(placeId)
    .then(res => {
      // console.log("availableDates",res.availableDates)
      if(!!res.availableDates) this.setState({availableDates: res.availableDates})
      else this.setState({availableDates: 'none'})
    })
  }

  handleStoreSelect = (store) => {
    this.setState({
      selectedStore: store.name,
      appointmentDate:'',
      appointmentTime: '',
      selectedStoreId:store.place_id,
      phoneNumber: store.phone_number,
      homeLocation: store.proximity_to_location,
      address:store.fullAddress
    })
    this.getAppointmentData(store.place_id)
  }

  handleDateSelect = (date) => {
    this.setState({
      appointmentDate:date,
      appointmentTime:''
    })
  }

  handleTimeSelect = (time) => {
    this.setState({
      appointmentTime:time,
    })
  }

  // handle map center
  handleCenter = event => this.state({center:{lat:0, lng:0 }})

  // extra input detail handlers
  handleTypeChange = event => this.setState({appointmentType:event.target.dataset.value})
  handleAppointmentFor = event => this.setState({appointmentFor:event.target.dataset.value})
  handleAdditionalInfo = ({target}) => this.setState({additionalInfo:target.value})
  handleSecondPerson = ({target}) => this.setState({secondPerson:{ ...this.state.secondPerson,[target.name]:target.value}})


  // handles searches and fetches store data from google for stores on gmaps
  searchForNearbyPlaces = (value) => {
    this.setState({searching: 'true'})
    fetchNearbyPlaces(value)
    .then(stores => {
      console.log("stores",stores)
      this.setState({searching: 'false'})
      this.props.dispatch(availableStoresAtLocation(stores))
    })
    .catch(error => {
      console.log("error: no nearby places",error)
        this.setState({searching: 'error'})
    })
  }

  render () {
    const {searching,appointmentFor,availableDates,appointmentDate,appointmentTime,selectedStoreId,selectedStore} = this.state
    const {availableStores} = this.props
    if(!!availableDates && availableDates !== 'none' && availableDates !== 'loader' && availableDates.length > 0) {
      var availableTimes = getAvailableTimes(appointmentDate, availableDates)
    }
    return (
      <span className='newWrap bookAppointment'>
        <Ticket title="Book an Appointment">
          <div className='welcomeMessage inverted'> Book a New Appointment </div>
            <NewGmap clickStore={this.handleStoreSelect} selectedStoreId={selectedStoreId} fetchNearbyPlaces={this.searchForNearbyPlaces}/>
            <div style={{padding:'0 10px'}}>

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
                <SelectAppointmentType
                  selectedAppointmentType={this.state.appointmentType}
                  handleTypeChange={this.handleTypeChange}/>

                <SelectWhoAppointmentIsFor
                  selectedAppointment={this.state.appointmentFor}
                  handleAppointmentFor={this.handleAppointmentFor}/>

                { appointmentFor ==='Someone else'?
                <BookSomeoneElse handleSecondPerson={this.handleSecondPerson}/>
                : null}

                <AdditionalInfo handleAdditionalInfo={this.handleAdditionalInfo}/><br/>
                <div onClick={this.handleBookAppointment} className='button primary'> Book Appointment</div><br/>
              </span>
              : null }

            <LinkButton extraClass='secondary appointment' to='/myappointments'> Back to my Appointments </LinkButton><br/>
          </div>
          <br/>
        </Ticket>
          <br/>
      </span>)
  }
}



export default connect(state => ({
  currentUser: state.data.currentUser,
  availableStores: state.appointments.availableStores
}))(BookAppointment)
