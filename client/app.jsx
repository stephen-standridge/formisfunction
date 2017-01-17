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

class ParamProvider extends React.Component {
  constructor(props) {
    super(props);
    this.registered = {};
    this.indices = [];        
    this.set = props.params && props.params.splat.split('/');    
    this.getComponentParam = this._getComponentParam.bind(this);
    this.setComponentParam = this._setComponentParam.bind(this);
    this.registerComponent = this._registerComponent.bind(this);
    this.unregisterComponent = this._unregisterComponent.bind(this);
    this.isComponentRegistered = this._isComponentRegistered.bind(this);
    this.componentWillReceiveProps = this.parseParams;
    this.parseParams(props);
  }

  _registerComponent(slug, other=false) {
    if (this.registered[slug]) {
      console.warn(`attempted to re-register component with slug ${slug}`);
      return;
    }
    if (other === false) {
      const index = this.indices.push(slug);
      this.registered[slug] = index - 1;   
    } else {
      this.registered[slug] = this.registered[other];
      delete this.registered[other];
    }

  }

  _isComponentRegistered(slug) {
    return !isNaN(this.registered[slug]);
  }

  _unregisterComponent(slug) {
    const atIndex = this.registered[slug];
    if(!atIndex) {
      console.warn(`attempted to unregister component with slug ${slug} but failed`);
      return;
    }
    this.indices.splice(atIndex, 1);
    this.indices.forEach((s, i)=> this.registered[s] = i);
  }

  parseParams({ params }) {
    const currentParams = this.props.params;  
    if (currentParams === params) return;
    this.set = params && params.splat.split('/');    
  }

  _setComponentParam(slug, param) {
    let atIndex = this.registered[slug];
    if (isNaN(atIndex)) {
      this.registerComponent(slug);
      atIndex = this.registered[slug];
    }
    this.set[atIndex] = slug + '_' + param;
    this.context.router.push('/' + this.set.join('/'))
  }

  _getComponentParam(slug) {
    const atIndex = this.registered[slug];    
    if (isNaN(atIndex)) {
      return; 
    }    
    return this.set[atIndex];
  }

  getChildContext() {
    return { 
      getParam: this.getComponentParam,
      setParam: this.setComponentParam,
      register: this.registerComponent,
      unregister: this.unregisterComponent,
      isRegistered: this.isComponentRegistered
    };
  } 

  render(){
    return this.props.children;
  }
};

ParamProvider.childContextTypes = {
  getParam: React.PropTypes.func,
  setParam: React.PropTypes.func,
  register: React.PropTypes.func,
  unregister: React.PropTypes.func,
  isRegistered: React.PropTypes.func
};

ParamProvider.contextTypes = {
  router: React.PropTypes.object
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