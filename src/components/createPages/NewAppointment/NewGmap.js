import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import {connect} from 'react-redux'
import {MarkerIcon} from '../../../content/icons/MapIcons'
import {handleFocus} from '../../../store/modules/actions'
import Autocomplete from './Autocomplete'

const HomeMarker = ({ text }) =>
  <div className='gmapsMarker home'>
    <MarkerIcon/>
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
        <Autocomplete
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
