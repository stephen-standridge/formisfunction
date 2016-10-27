import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { DevTools } from './stores/dev_tools'
import configureStore from './stores/configure_store'
import Nav from './components/nav/Nav'
import Home from './components/home/Home'


const [store, history] = configureStore()

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