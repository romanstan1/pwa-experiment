
// Log In / Out Actions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const login = (username, password) => {
  return dispatch => dispatch({
    type: 'LOGIN',
    username,
    password
  })
}
export const logout = () => {
  return dispatch => dispatch({
    type: 'LOGOUT'
  })
}

// Create / Update Actions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const bookAppointment = ({selectedStore,appointmentDate,appointmentTime,appointmentType,appointmentFor,additionalInfo,secondPerson,phoneNumber,homeLocation,address}, idNumber) => {
  return dispatch => dispatch({
    type: 'BOOK_APPOINTMENT',
    selectedStore,
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentFor,
    additionalInfo,
    secondPerson,
    phoneNumber,
    homeLocation,
    address,
    idNumber
  })
}
export const confirmAppointment = (newAppointment) => {
  return dispatch => dispatch({
    type: 'CONFIRM_APPOINTMENT',
    payload: newAppointment
  })
}
export const setAppointments = (appointments) => {
  return dispatch => dispatch({
    type: 'SET_APPOINTMENTS',
    payload: appointments
  })
}
export const newOrder = (brand,lenseType) => {
  return dispatch => dispatch({
    type: 'NEW_ORDER',
    brand,
    lenseType
  })
}
export const addCard = (cardType,cardNumber) => {
  return dispatch => dispatch({
    type: 'ADD_CARD',
    cardType,
    cardNumber
  })
}
export const updateSubscription = (brand,date,lenseType) => {
  return dispatch => dispatch({
    type: 'UPDATE_SUBSCRIPTION',
    brand,
    date,
    lenseType
  })
}
export const updatePerscription = (left_eye,right_eye) => {
  return dispatch => dispatch({
    type: 'UPDATE_PERSCRIPTION',
    left_eye,
    right_eye
  })
}
export const updatePersonalDetails = (title,first_name,last_name,address,postcode,dob) => {
  return dispatch => dispatch({
    type: 'UPDATE_PERSONAL_DETAILS',
    title,
    first_name,
    last_name,
    address,
    postcode,
    dob
  })
}
export const updateAccountDetails = (username, password) => {
  return dispatch => dispatch({
    type: 'UPDATE_ACCOUNT_DETAILS',
    username,
    password
  })
}
export const updateCurrentLocation = (location) => {
  return dispatch => dispatch({
    type: 'UPDATE_CURRENT_LOCATION',
    payload: location
  })
}
export const updateWeather = (weatherType) => {
  return dispatch => dispatch({
    type: 'UPDATE_WEATHER',
    payload: weatherType,
  })
}

// Misc Actions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const selectNav = (selected) => {
  return dispatch => dispatch({
    type: 'SELECT_NAV',
    payload: selected
  })
}

export const handleFocus = (focusedState) => {
  return dispatch => dispatch({
    type: 'HANDLE_FOCUS',
    payload: focusedState
  })
}

export const delayOrder = (id) => {
  return dispatch => dispatch({
    type: 'DELAY_ORDER',
    id
  })
}
export const userStoreUpdate = () => {
  return dispatch => dispatch({
    type: 'USER_STORE_UPDATE'
  })
}
export const availableStoresAtLocation = (availableStores) => {
  return dispatch => dispatch({
    type: 'AVAILABLE_STORES_AT_LOCATION',
    availableStores
  })
}
export const updateNotifications = (cleared) => {
  return dispatch => dispatch({
    type: 'UPDATE_NOTIFICATIONS',
    cleared
  })
}
export const clickedOnNotifications = (notificationType) => {
  return dispatch => dispatch({
    type: 'CLICKED_ON_NOTIFICATIONS',
    notificationType
  })
}
// export const confirmAppointment = () => {
//   return dispatch => dispatch({
//     type: 'CONFIRM_APPOINTMENT'
//   })
// }
export const clearAppointmentCache = () => {
  return dispatch => dispatch({
    type: 'CLEAR_APPOINTMENT_CACHE'
  })
}

// Delete Actions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const deleteAppointment = (id) => {
  return dispatch => dispatch({
    type: 'DELETE_APPOINTMENT',
    id
  })
}
export const deleteCard = (index) => {
  return dispatch => dispatch({
    type: 'DELETE_CARD',
    index
  })
}
export const cancelOrder = (id) => {
  return dispatch => dispatch({
    type: 'CANCEL_ORDER',
    id
  })
}
