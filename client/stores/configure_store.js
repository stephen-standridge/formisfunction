import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { apiMiddleware } from 'redux-api-middleware';
import { connectDevTool } from './dev_tools'
import * as reducers from '../reducers'

const reducer = combineReducers({ ...reducers, routing: routerReducer })
const stores = connectDevTool([ reducer, applyMiddleware( apiMiddleware ) ])

 
export default function configureStore(initialState={}) {
	let store = createStore(...stores)
	let history = syncHistoryWithStore(browserHistory, store)
  return [store,history]
}