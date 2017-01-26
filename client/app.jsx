import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { DevTools } from './stores/dev_tools'
import configureStore from './stores/configure_store'
import { Component } from './components'
import CSS from './styles/app.scss'


const [store, history] = configureStore()

var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/*" component={(props,state) => {
          return <ParamProvider params={props.params}>
            <Component slug={'site'} />
          </ParamProvider>
        } } />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)