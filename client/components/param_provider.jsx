class ParamProvider extends React.Component {
  constructor(props) {
    super(props);
    const { match, location, slug } = props;
    const { url } = match;
    const { hash } = location;
    this.registered = {};
    this.indices = [];
    if (hash){
      this.set = hash && hash.split('#!/');
      this.set.shift();
    } else {
      this.set = url && url.split('/');
      this.set.shift();
    }
    this.set = this.set || [];
    this.getComponentParam = this._getComponentParam.bind(this);
    this.getComponentParams = this._getComponentParams.bind(this);
    this.setComponentParam = this._setComponentParam.bind(this);
    this.registerComponent = this._registerComponent.bind(this);
    this.unregisterComponent = this._unregisterComponent.bind(this);
    this.isComponentRegistered = this._isComponentRegistered.bind(this);
    this.componentWillReceiveProps = this.parseParams;
    this.parseParams(props);
  }
  componentWillMount(){
    this.context.router.history.push('/' + this.set.join('/'))
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
      if (!this.registered[other]) console.warn(`attempted to register ${slug} as unregistered ${other}`)
      this.registered[slug] = this.registered[other];
      delete this.registered[other];
    }
  }

  _isComponentRegistered(slug) {
    return !isNaN(this.registered[slug]);
  }

  _unregisterComponent(slug) {
    const atIndex = this.registered[slug];
    if(isNaN(Number(atIndex))) {
      console.warn(`attempted to unregister component with slug ${slug} but failed`);
      return;
    }
    this.indices.splice(atIndex, 1);
    this.indices.forEach(function (s, i) { this.registered[s] = i }.bind(this));
  }

  parseParams({ match, location }) {
    const { url } = match;
    const { hash } = location;
    const oldMatch = this.props.match;
    const oldUrl = oldMatch && oldMatch.url;
    if (oldUrl === url || oldUrl === hash) return;
    if (hash) {
      this.set = url && url.split('#!/')[1].split('/');
      this.set.shift();
    } else {
      this.set = url && url.split('/');
      this.set.shift();
    }
    return this.set;
  }

  _setComponentParam(slug, param) {
    let atIndex = this.registered[slug];
    if (isNaN(atIndex)) {
      this.registerComponent(slug);
      atIndex = this.registered[slug];
    }

    this.indices.length = atIndex + 1;
    this.set.length = atIndex + 1;
    this.set[atIndex] = param;
    this.context.router.history.push('/' + this.set.join('/'))
  }

  _getComponentParams(slug) {
    return Object.keys(this.registered).map(function(k){ return this.set[this.registered[k]] }.bind(this));
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
      getParams: this.getComponentParams,
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
  getParams: React.PropTypes.func,
  getParam: React.PropTypes.func,
  setParam: React.PropTypes.func,
  register: React.PropTypes.func,
  unregister: React.PropTypes.func,
  isRegistered: React.PropTypes.func
};

ParamProvider.contextTypes = {
  router: React.PropTypes.object
};

export { ParamProvider }
