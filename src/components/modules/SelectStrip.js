import React, {Component} from 'react'
import moment from 'moment'

const specsaverGreen = '#159936'
const mapObjectToArray =  items => items.map(item=>{
  if(!!item.name) return item.name
  else return item.date
})

class StripStoreItem extends Component {
  state = {selected: false}
  onClick = event => {
    const {handleClick,phoneNumber,homeLocation,address} = this.props
    handleClick(event.target.dataset.value, this.state.selected, event.target.dataset.place,phoneNumber,homeLocation,address)
    this.state.selected? this.setState({selected:false}) : this.setState({selected:true})
  }
  render() {
    const {item,placeId,selectedValue,distance} = this.props
    return (
    <span className='stripItem store'>
      <div data-value={item} data-place={placeId} onClick={this.onClick}>
      </div>
      <span style={selectedValue === item? {background:specsaverGreen,color:'white'} : null}>
        <div className='item'>{item}</div>
        <div className='distance'>{distance}</div>
      </span>
    </span>)
  }
}

class StripNonStoreItem extends Component {
  state = {selected: false}
  onClick = event => {
    const {handleClick} = this.props
    handleClick(event.target.dataset.value, this.state.selected)
    this.state.selected? this.setState({selected:false}) : this.setState({selected:true})
  }
  render() {
    const {item,placeId,selectedValue,name} = this.props
    return (
    <span className={name === 'appointmentDate'? 'stripItem date':'stripItem time'}>
      <div data-value={item} data-place={placeId} onClick={this.onClick}>
      </div>
      <span style={selectedValue === item? {background:specsaverGreen,color:'white'} : null}>
        {name === 'appointmentDate'?
        <div>
          <span className='day'>{moment(item, 'MMM DD YYYY').format('llll').slice(0, 3)}</span>
          <span>{moment(item, 'MMM DD YYYY').format('ll').slice(0, -6)}</span>
        </div>
        :<div>{item}</div>}
      </span>
    </span>)
  }
}

export default class SelectStrip extends Component {
  state = {selected:''}
  handleClick = (value,itemSelected,place,phoneNumber,homeLocation,address) => {
    const {giveSelections,name} = this.props
    this.setState({selected:value})
    giveSelections(value,name,place,phoneNumber,homeLocation,address)
  }

  componentDidUpdate = () => {
    if(typeof this.state.selected === 'string' && this.props.value === '') this.setState({selected:[]})
  }

  render () {
    let {items,noScroll,name} = this.props
    if(typeof items[0] ==='object') items = mapObjectToArray(items)
    const storeItems = this.props.items
    const {selected} = this.state
    // console.log("items, selected", selected, value, name)
    return (
      <div className={!!noScroll? 'selectStrip noScroll':'selectStrip'}>
        { name ==='selectedStore'? items.map((item,index) =>
          <StripStoreItem
            selectedValue={selected}
            placeId={storeItems[index].place_id}
            distance={storeItems[index].proximity.distance.text}
            phoneNumber={storeItems[index].phone_number}
            homeLocation={storeItems[index].proximity_to_location}
            address={storeItems[index].fullAddress}
            handleClick={this.handleClick}
            key={index}
            item={item}
          />)
          :
          items.map((item,index) =>
          <StripNonStoreItem
            selectedValue={selected}
            handleClick={this.handleClick}
            key={index}
            item={item}
            name={name}
          />)
        }
      </div>
    )
  }
}
