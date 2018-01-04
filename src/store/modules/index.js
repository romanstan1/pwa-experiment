import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data, {appointmentsReducer, selectNavReducer} from './reducers'

export default combineReducers({
  routing: routerReducer,
  data,
  appointments: appointmentsReducer,
  selected: selectNavReducer
})
