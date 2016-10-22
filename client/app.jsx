import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Home, Foo, Bar, Posts } from './components'
import ReduxThunk from 'redux-thunk'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const DevTools = process.env.NODE_ENV == 'development' ?  createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
) : function(){ return <div />}
var stores = [
  reducer,
  applyMiddleware( ReduxThunk )
]
stores = process.env.NODE_ENV == 'development' ? stores.concat( DevTools.instrument()) : stores;

const store = createStore(...stores)
const history = syncHistoryWithStore(browserHistory, store)
var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="foo" component={Foo}/>
          <Route path="bar" component={Bar}/>
          <Route path="posts" component={Posts}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)