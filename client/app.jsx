import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import configureStore from './stores/configure_store'
import { ComponentCreator, ParamProvider } from './components'
import './resets.scss'
import './app.scss'
import './fonts'

const [store, history] = configureStore()

var div = document.createElement("div");
div.id = 'mount'

var link = document.createElement('link');
    link.id = 'lato';
    link.rel = 'stylesheet';
    link.href = "https://fonts.googleapis.com/css?family=Josefin+Sans:400,300,600|Lato:400"

document.head.appendChild(link);
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/*" component={(props,state) => {
          return <ParamProvider {...props}>
            <ComponentCreator slug={'not_staging'} withHistory={true}/>
          </ParamProvider>
        } } />
      </Router>
    </div>
  </Provider>,
  document.getElementById('mount')
)
