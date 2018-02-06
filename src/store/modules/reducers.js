import {initialState, opticianNames,random} from './seed'
import {updateNotifications, checkDate} from './reducer-utilities'
import moment from 'moment'
import _ from 'underscore'

export const appointmentsReducer = (state='', action) =>{
  switch(action.type){
    case 'AVAILABLE_STORES_AT_LOCATION': return {
      ...state,
      availableStores: action.availableStores
    }
    default: return state
  }
}

export const selectNavReducer = (state='', action) =>{
  switch(action.type){
    case 'SELECT_NAV': return action.payload
    default: return state
  }
}

export const weatherReducer = (state='', action) =>{
  switch(action.type){
    case 'UPDATE_WEATHER': return action.payload
    default: return state
  }
}

export const onFocusReducer = (state='blur', action) =>{
  switch(action.type){
    case 'HANDLE_FOCUS': return action.payload
    default: return state
  }
}

export default (state=initialState, action)=>{
  if(action.type === 'CONFIRM_APPOINTMENT') console.log("CONFIRM_APPOINTMENT: ", action)
  switch(action.type){
    case 'LOGIN': return {
      ...state,
      currentUser: Object.assign({}, state.users[0])
    }
    case 'LOGOUT': return {
      ...state,
      currentUser: null
    }
    // Create / Update Reducers - - - - - - - - - - - - - - - - - - - - - - - - - -
    case 'CONFIRM_APPOINTMENT': return {
      ...state,
      confirmedAppointment: {
        selectedStore: action.payload.selectedStore,
        dateAndTime: action.payload.dateAndTime,
        address: action.payload.address,
        optician:action.payload.optician,
        homeLocation: action.payload.homeLocation,
        placeId:action.payload.placeId,
        type:action.payload.type,
        for: action.payload.for,
        additional:action.payload.additionalInfo,
        phoneNumber: action.payload.phoneNumber,
        uuid: action.payload.uuid
      }
    }
    case 'SET_APPOINTMENTS': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        appointments: [].concat(action.payload)
      }
    }
    case 'NEW_ORDER': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orders: [].concat(state.currentUser.orders, [{
          purchase_date: moment().format('ll'),
          brand: action.brand,
          type: action.lenseType,
          prescription: state.currentUser.prescription,
          order_type: 'Individual',
          status:'Processing',
          id:_.random(1,999999)
        }])
      }
    }
    case 'ADD_CARD': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        payment_cards: [].concat(state.currentUser.payment_cards, [{
          type: action.cardType,
          number: action.cardNumber
        }])
      }
    }
    case 'UPDATE_SUBSCRIPTION': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        subscription: {
          type: action.lenseType,
          brand: action.brand,
          next_arrival_date:moment(action.date,'MMMDDYYYY').format('ll')
        }
      }
    }
    case 'UPDATE_CURRENT_LOCATION': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        currentLocation: action.payload
      }
    }
    case 'UPDATE_PERSCRIPTION': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        left_eye: action.left_eye,
        right_eye: action.right_eye
      }
    }
    case 'UPDATE_PERSONAL_DETAILS': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        title: action.title,
        first_name: action.first_name,
        last_name: action.last_name,
        dob: action.dob,
        address:action.address,
        postcode:action.postcode
      }
    }
    case 'UPDATE_ACCOUNT_DETAILS': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        username: action.username,
        password: action.password
      }
    }

    // Misc Reducers - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    case 'DELAY_ORDER': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orders: state.currentUser.orders.map(order => action.id === order.id? {
            ...order,
            purchase_date: moment(order.purchase_date,'MMMDDYYYY').add(7, 'days').format('ll'),
            status: 'Processing'
          } : order )
      }
    }
    case 'USER_STORE_UPDATE': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orders: [].concat(state.currentUser.orders.map(order => ({
          ...order,
          status: checkDate(order.purchase_date)})), [{
          purchase_date: state.currentUser.subscription.next_arrival_date,
          brand: state.currentUser.subscription.brand,
          type: state.currentUser.subscription.type,
          prescription: state.currentUser.prescription,
          order_type: 'Subscription',
          status:checkDate(state.currentUser.subscription.next_arrival_date),
          id:_.random(1,999999)
        }])
      }
    }
    case 'UPDATE_NOTIFICATIONS': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        notifications: updateNotifications(state.currentUser.orders, state.currentUser.appointments),
        clicked_notifications: action.cleared? state.currentUser.clicked_notifications : updateNotifications(state.currentUser.orders, state.currentUser.appointments)
      }
    }
    case 'CLICKED_ON_NOTIFICATIONS': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        clicked_notifications: {
          ...state.currentUser.clicked_notifications,
          [action.notificationType]: 0
        }
      }
    }
    // case 'CONFIRM_APPOINTMENT': return {
    //   ...state,
    //   currentUser: {
    //     ...state.currentUser,
    //     appointments: [].concat(state.currentUser.appointments, [{
    //       ...state.bookAppointment
    //     }])
    //   }
    // }
    case 'CLEAR_APPOINTMENT_CACHE': return {
      ...state,
      confirmedAppointment: null
    }

    // Delete Reducers - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    case 'DELETE_APPOINTMENT': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        appointments: state.currentUser.appointments.filter((appointment,index) => action.id !== appointment.id)
      }
    }
    case 'DELETE_CARD': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        payment_cards: state.currentUser.payment_cards.filter((card,index) => action.index !== index)
      }
    }
    case 'CANCEL_ORDER': return {
      ...state,
      currentUser: {
        ...state.currentUser,
        orders: state.currentUser.orders.map((order,id) => action.id === order.id? {
            ...order,
            status:'Cancelled'} : order )
      }
    }
    default: return state
  }
}
