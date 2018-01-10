import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import {updateNotifications, selectNav} from './modules/actions'

export const history = createHistory()

const enhancers = []
const logger = store => next => action => {
  let result = next(action)
  console.log(store.getState())

  if(action.type === 'LOGIN') store.dispatch({type: 'USER_STORE_UPDATE'})
  else if(['DELETE_APPOINTMENT','CANCEL_ORDER'].includes(action.type)) store.dispatch(updateNotifications(true))
  else if( ['USER_STORE_UPDATE','NEW_ORDER','CONFIRM_APPOINTMENT'].includes(action.type)) store.dispatch(updateNotifications(false))

  // console.log("action.type",action.type, action.payload)
  if(action.type === '@@router/LOCATION_CHANGE') store.dispatch(selectNav(action.payload.pathname.substring(1)))

  return result
}

const middleware = [
  thunk,
  routerMiddleware(history),
  logger
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

export default store
