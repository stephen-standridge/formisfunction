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

var Redirect = React.createClass({
  statics: {
    willTransitionTo: function(transition, params) {
      console.warn(params)
      // transition.redirect('user-details', params);
    }
  },
  render(){ return }
});

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/" component={(props,state) => <Component slug={'site'} params={props.params} /> }>
          <Route path=":modifier">
            <Route path=":modifier2">
              <Route path=":2">
              </Route>                
            </Route>          
          </Route>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)