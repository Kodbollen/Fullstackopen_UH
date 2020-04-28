import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import timeoutReducer from './reducers/timeOutReducer'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
	timeoutId: timeoutReducer})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)))

export default store
