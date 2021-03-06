import React, {Component} from 'react';
import {Route,Router,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './modules/Header'

import HomePage from './HomePage'
import ErrorPage from './ErrorPage'
import LoginPage from './LoginPage'
import ShopPage from './ShopPage'
import ServicesPage from './ServicesPage'
import OCRScanner from './OCRScanner'
import QRScanner from './QRScanner'

import HomeReel from './myPages/HomeReel'
import MyAppointments from './myPages/MyAppointments'
import Account from './myPages/Account'
import MyOrders from './myPages/MyOrders'

import AddCard from './createPages/AddCard'
import ConfirmAppointment from './createPages/ConfirmAppointment'
import NewAppointment from './createPages/NewAppointment'
import NewOrder from './createPages/NewOrder'
import UpdateSubscription from './createPages/UpdateSubscription'
import UpdatePerscription from './createPages/UpdatePerscription'
import UpdateDetails from './createPages/UpdateDetails'
import UpdateAccount from './createPages/UpdateAccount'
import {history} from '../store'
import {fetchWeather} from '../api/darksky'
import {updateCurrentLocation, updateWeather} from '../store/modules/actions'

class App extends Component {
  componentDidMount() {

    const {dispatch} = this.props

    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position: ",position.coords.latitude, position.coords.longitude)
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        dispatch(updateCurrentLocation({lat, lng}))
        fetchWeather(lat,lng)
          .then((weatherType) => {
            console.log("weatherType: ",weatherType)
            dispatch(updateWeather(weatherType))
          })
      })

    }

  }

  render() {
    const {currentUser} = this.props
    return (
      <Router history={history}>
        <div className='wrap'>
            { !currentUser ?
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/loginpage" component={LoginPage} />
                <Route component={HomePage}/>
              </Switch>
              :
              <Switch>
                <Route exact path="/" component={HomeReel} />
                <Route exact path="/loginpage" component={LoginPage} />
                <Route exact path="/shoppage" component={ShopPage} />
                <Route exact path="/servicespage" component={ServicesPage} />

                <Route exact path="/neworder" component={NewOrder} />
                <Route exact path="/confirmappointment" component={ConfirmAppointment} />
                <Route exact path="/bookappointment" component={NewAppointment} />
                <Route exact path="/newappointment" component={NewAppointment} />
                <Route exact path="/addcard" component={AddCard} />

                <Route exact path="/updatesubscription" component={UpdateSubscription} />
                <Route exact path="/updateperscription" component={UpdatePerscription} />
                <Route exact path="/updatedetails" component={UpdateDetails} />
                <Route exact path="/updateaccount" component={UpdateAccount} />
                <Route exact path="/OCRScanner" component={OCRScanner} />
                <Route exact path="/QRScanner" component={QRScanner} />

                <Route exact path="/homereel" component={HomeReel} />
                <Route exact path="/myappointments" component={MyAppointments} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/myorders" component={MyOrders} />

                <Route component={HomePage}/>
              </Switch>
             }
             <Header/>
        </div>
      </Router>
    )
  }
}
export default connect(state => ({
  currentUser: state.data.currentUser
}))(App)
