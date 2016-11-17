import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { DevTools } from './stores/dev_tools'
import configureStore from './stores/configure_store'
import { View, Main, MainVideo } from './components'
import CSS from './styles/app.scss'

const [store, history] = configureStore()

var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/" component={Main} >
          <IndexRoute component={MainVideo} /> 
          <Route path=':slug' component={View} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)