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

function makeGetParams(params) {
  const set = params.splat && params.splat.split('/');
  return set && function(){
    return set.pop();
  }
}

class ParamProvider extends React.Component {
  constructor(props) {
    super(props);
    this.getComponentParam = this._getComponentParam.bind(this);
    this.getComponentParamIndex = this._getComponentParamIndex.bind(this);
    this.componentWillMount = this.setUp
    this.componentWillReceiveProps = this.setUp
  }

  setUp({ params } = this.props) {
    this.set = params && params.splat.split('/');
    this.register = {};
    this.indices = [];
  }
  _getComponentParamIndex(slug) {
    return this.indices.findIndex( key => key == slug);
  }
  _getComponentParam(slug) {
    if (this.register[slug]) return this.register[slug];
    this.register[slug] = this.set.shift();
    this.indices.push(slug);
    return this.register[slug];
  }
  getChildContext() {
    return { 
      param: this.getComponentParam,
      paramIndex: this.getComponentParamIndex
    };
  } 
  render(){
    return this.props.children;
  }
};

ParamProvider.childContextTypes = {
  param: React.PropTypes.func,
  paramIndex: React.PropTypes.func
};

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