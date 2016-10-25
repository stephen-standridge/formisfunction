import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { DevTools, connectDevTool } from './components/dev_tools/DevTools'
import Nav from './components/nav/Nav'
import Home from './components/home/Home'
import ReduxThunk from 'redux-thunk'

const reducer = combineReducers({ ...reducers, routing: routerReducer })

var stores = connectDevTool([ reducer, applyMiddleware( ReduxThunk ) ])


const store = createStore(...stores)
const history = syncHistoryWithStore(browserHistory, store)
var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Nav}>
          <IndexRoute component={Home}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)