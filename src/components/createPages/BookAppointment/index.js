import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../../modules/Ticket'
import {BookSomeoneElse, DefineSelectStrip,SelectAppointmentType,
  SelectWhoAppointmentIsFor,AdditionalInfo, getAvailableTimes, AppointmentText} from './AppointmentModules'
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
      console.log("availableDates",res.availableDates)
      if(!!res.availableDates) this.setState({availableDates: res.availableDates})
      else this.setState({availableDates: 'none'})
    })
  }
  getSelections = (value,name,placeId,phoneNumber,homeLocation,address) => {

    if(name === 'clickStore') {
      this.setState({
        selectedStore: value.name,
        appointmentDate:'',
        appointmentTime: '',
        selectedStoreId:value.place_id,
        phoneNumber: value.phone_number,
        homeLocation:value.proximity_to_location,
        address: value.fullAddress
      })
      this.getAppointmentData(value.place_id)
    }

    if(name ==='selectedStore') {
      this.setState({
        selectedStore: value,
        appointmentDate:'',
        appointmentTime: '',
        selectedStoreId:placeId,
        phoneNumber,homeLocation,address
      })
      this.getAppointmentData(placeId)
    }
    else if (name ==='appointmentDate') this.setState({appointmentDate:value,appointmentTime: ''})
    else this.setState({[name]:value})
  }

  handleCenter = event => this.state({center:{lat:0, lng:0 }})
  handleTypeChange = event => this.setState({appointmentType:event.target.dataset.value})
  handleAppointmentFor = event => this.setState({appointmentFor:event.target.dataset.value})
  handleAdditionalInfo = ({target}) => this.setState({additionalInfo:target.value})
  handleSecondPerson = ({target}) => this.setState({secondPerson:{ ...this.state.secondPerson,[target.name]:target.value}})

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
    const {searching,appointmentFor,availableDates,appointmentDate,appointmentTime,selectedStoreId} = this.state
    const {availableStores} = this.props
    if(!!availableDates && availableDates !== 'none' && availableDates !== 'loader' && availableDates.length > 0) {
      var availableTimes = getAvailableTimes(appointmentDate, availableDates)
    }
    return (
      <span className='newWrap bookAppointment'>
        <Ticket title="Book an Appointment">
          <div className='welcomeMessage inverted'> Book a New Appointment </div>
            <NewGmap clickStore={this.getSelections} selectedStoreId={selectedStoreId} fetchNearbyPlaces={this.searchForNearbyPlaces}/>
            <div style={{padding:'0 10px'}}>
              {!!availableStores && !!availableStores[0]?
                <DefineSelectStrip
                  name="selectedStore"
                  giveSelections={this.getSelections}
                  items={availableStores}/> :null }
              {searching === 'true'? <AppointmentText text='Loading...'/> : null }
              {searching === 'error'? <AppointmentText text='No stores nearby. Check your internet connection and search again'/> : null }

              {!!availableDates && availableDates !== 'none' && availableDates !== 'loader' && !!availableDates.length?
                <DefineSelectStrip
                  name="appointmentDate"
                  value={this.state.appointmentDate}
                  giveSelections={this.getSelections}
                  items={availableDates}/> :null
                // {this.state.selectedStoreId? null: <NoAppointments/> }
              }
              {!!availableDates && availableDates === 'loader'? <AppointmentText text='Loading...'/>:null}
              {!!availableDates && availableDates === 'none'? <AppointmentText text='No appointments currently available at this store'/>:null}

              {!!availableTimes && !!availableTimes.length?
                <DefineSelectStrip
                  noScroll value={this.state.appointmentTime}
                  name="appointmentTime"
                  giveSelections={this.getSelections}
                  items={availableTimes}/> : null}

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
