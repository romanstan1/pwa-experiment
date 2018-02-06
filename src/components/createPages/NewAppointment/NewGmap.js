import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import {connect} from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {HomeIcon, MarkerIcon} from '../../../content/icons/MapIcons'
import {handleFocus} from '../../../store/modules/actions'


const cssClasses = {
    root: 'form-group',
    input: 'form-control',
    autocompleteContainer: 'my-autocomplete-container'
  }

class AutoComplete extends Component {

  state = { location: ''}

  onChange = (location) => this.setState({ location })

  handleSearch = location => {
    this.setState({ location })
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onInputChanged(latLng))
      .catch(error => console.error('Error', error))
  }


  render() {
    const inputProps = {
      value: this.state.location,
      onChange: this.onChange,
      placeholder: 'Enter Location...',
      onBlur: () => this.props.focusHandler('blur'),
      onFocus: () => this.props.focusHandler('focus'),
    }

    return (<div className='gmap-search-wrap'>
        <PlacesAutocomplete
          inputProps={inputProps}
          classNames={cssClasses}
          onSelect={this.handleSearch}
          inputProps={inputProps}
          onEnterKeyDown={this.handleSearch}
          highlightFirstSuggestion={true} />
      </div>)
  }
}

const HomeMarker = ({ text }) =>
  <div className='gmapsMarker home'>
    <HomeIcon/>
  </div>

const StoreMarker = ({selectedStoreId, placeId, store, clickStore}) => {
  const onClick = () => clickStore(store)
  return <div onClick={onClick} className={selectedStoreId === placeId? 'gmapsMarker store selected' : 'gmapsMarker store'}>
    <MarkerIcon/>
  </div>
}


class NewGmap extends Component {

  state = {
    defaultCenter: {lat:51.4067679, lng: -0.2402061999999887},
    center:null,
    zoom: 10
  }
  focusHandler = (type) => this.props.dispatch(handleFocus(type))

  onInputChanged = center => {
    this.setState({center})
    this.props.fetchNearbyPlaces(center)
  }
  clickStore = (store) => {
    this.props.clickStore(store, 'clickStore')
  }
  componentDidMount() {
    const center = this.props.currentLocation
    if(center) {
      this.setState({center })
      this.props.fetchNearbyPlaces(center)
    }
  }

  render() {
    const {center,defaultCenter,zoom} = this.state
    const {availableStores,selectedStoreId} = this.props
    return (
      <div className='gmap-wrap'>
        <div id='gmap-attach'></div>
        <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyD9T-reTt6UeEjRbwGNBWkH3mB2d21F7rs&v=3"}}
          center={!!center? center: defaultCenter}
          defaultZoom={zoom}
        >
          {!!center? <HomeMarker
            lat={center.lat}
            lng={center.lng}
            text={'Home'}
          /> : null}
          {!!availableStores? availableStores.map((store,index) =>
            <StoreMarker
              clickStore={this.clickStore}
              key={index}
              placeId={store.place_id}
              store={store}
              selectedStoreId={selectedStoreId}
              lat={store.geometry.location.lat}
              lng={store.geometry.location.lng}
              text={'Store'}
            />): null
          }

        </GoogleMap>
        <AutoComplete
          focusHandler={this.focusHandler}
          placeholder='Enter Postcode'
          onInputChanged={this.onInputChanged}/>
      </div>
    )
  }
}

export default connect(state => ({
  availableStores: state.appointments.availableStores
}))(NewGmap)
