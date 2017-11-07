import React, {Component} from 'react'
import {connect} from 'react-redux'
import Ticket from '../../modules/Ticket'
import {BookSomeoneElse, DefineSelectStrip, NoAppointments,SelectAppointmentType,
  SelectWhoAppointmentIsFor,AdditionalInfo, getAvailableTimes} from './AppointmentModules'
import NewGmap from './NewGmap'
import LinkButton from '../../modules/LinkButton'
import {bookAppointment,availableStoresAtLocation} from '../../../store/modules/actions'
import underscore from 'underscore'
import {fetchNearbyPlaces} from '../../../api/google'
import {fetchAppointmentsData} from '../../../api/appointments'

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
    address:null
  }
  handleBookAppointment = () => {
    const idNumber= underscore.random(1,999999)
    const {history,dispatch} = this.props
    dispatch(bookAppointment(this.state,idNumber))
    history.push(`/confirmappointment`)
  }
  getSelections = (value,name,placeId,phoneNumber,homeLocation,address) => {
    if(name ==='selectedStore') {
      this.setState({selectedStore: value, appointmentDate:'',appointmentTime: '',selectedStoreId:placeId,phoneNumber,homeLocation,address})
      fetchAppointmentsData(placeId)
      .then(res=> {
        this.setState({availableDates: res.availableDates})
        console.log("availableDates",res.availableDates)
      })
    }
    else if (name ==='appointmentDate') this.setState({appointmentDate:value,appointmentTime: ''})
    else this.setState({[name]:value})
  }

  handleCenter = event => this.state({center:{lat:0, lng:0 }})
  handleTypeChange = value => this.setState({appointmentType:value})
  handleAppointmentFor = value => this.setState({appointmentFor:value})
  handleAdditionalInfo = ({target}) => this.setState({additionalInfo:target.value})
  handleSecondPerson = ({target}) => this.setState({secondPerson:{ ...this.state.secondPerson,[target.name]:target.value}})

  searchForNearbyPlaces = (value) => {
    fetchNearbyPlaces(value)
    .then(stores => {
      console.log("stores",stores)
      this.props.dispatch(availableStoresAtLocation(stores))
    })
  }

  render () {
    const {selectedStore,appointmentFor,availableDates,appointmentDate,appointmentTime,selectedStoreId} = this.state
    const {availableStores} = this.props
    if(!!availableDates && availableDates.length > 0) {
      var availableTimes = getAvailableTimes(appointmentDate, availableDates)
    }
    return (
      <span className='newWrap bookAppointment'>
        <Ticket title="Book an Appointment">
          <NewGmap selectedStoreId={selectedStoreId} fetchNearbyPlaces={this.searchForNearbyPlaces}/>

          {!!availableStores && !!availableStores[0]?
            <DefineSelectStrip
              name="selectedStore"
              giveSelections={this.getSelections}
              items={availableStores}/> :null }

          {!!availableDates && !!availableDates.length?
            <DefineSelectStrip
              name="appointmentDate"
              value={this.state.appointmentDate}
              giveSelections={this.getSelections}
              items={availableDates}/> :null }

          {!!availableTimes && !!availableTimes.length?
            <DefineSelectStrip
              noScroll value={this.state.appointmentTime}
              name="appointmentTime"
              giveSelections={this.getSelections}
              items={availableTimes}/> : null}

          {appointmentTime !== ''?
          <span>
            <SelectAppointmentType
              appointmentType={this.state.appointmentType}
              handleTypeChange={this.handleTypeChange}/>

            <SelectWhoAppointmentIsFor
              appointmentFor={this.state.appointmentFor}
              handleAppointmentFor={this.handleAppointmentFor}/>

            { appointmentFor ==='Someone else'?
            <BookSomeoneElse handleSecondPerson={this.handleSecondPerson}/>
            : null}

            <AdditionalInfo handleAdditionalInfo={this.handleAdditionalInfo}/><br/>
            <div onClick={this.handleBookAppointment} className='button'> Book Appointment</div><br/>
          </span>
          : null }

          <LinkButton to='/myappointments'> Go to - My Appointments </LinkButton><br/>
        </Ticket>
      </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser,
  availableStores: state.appointments.availableStores
}))(BookAppointment)
