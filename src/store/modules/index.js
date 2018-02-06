import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data, {appointmentsReducer, selectNavReducer, onFocusReducer, weatherReducer} from './reducers'

export default combineReducers({
  routing: routerReducer,
  data,
  appointments: appointmentsReducer,
  selected: selectNavReducer,
  focusedState: onFocusReducer,
  weatherType: weatherReducer
})
