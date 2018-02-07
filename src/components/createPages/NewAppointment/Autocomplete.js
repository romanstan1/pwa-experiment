import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const cssClasses = {
    root: 'form-group',
    input: 'form-control',
    autocompleteContainer: 'my-autocomplete-container'
  }

export default class AutoComplete extends Component {

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
