import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { DevTools } from './stores/dev_tools'
import configureStore from './stores/configure_store'
import { Nav, View, Paths, Contact } from './components'


const [store, history] = configureStore()

var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Nav}>
          <IndexRoute component={Paths} />
          <Route path="contact" component={Contact}/>          
          <Route component={Paths}>
            <Route path=':slug' component={View} />          
          </Route>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)