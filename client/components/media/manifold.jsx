import { connect } from 'react-redux';
import createManifold from '@stephen.standridge/manifold';

class ManifoldMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideProgress: false,
      hideSpinner: false,
      statusText: 'Downloading...',
      moduleIndex: 0
    };
    this.Manifold;
    this.configuration;
    this.scriptElement;

  }

  componentDidMount(){
    this.componentDidUpdate({ manifold: {} })
  }
  componentDidUpdate(prevProps, prevState) {
      const { manifold } = this.props;
      const prevManifold = prevProps.manifold;
      const { urlPrefix, initializer } = manifold;
      if(initializer !== prevManifold.initializer){
        let script = document.createElement('script');
        script.onload = this.initializeManifold.bind(this)
        script.src = this.locateFile(`${initializer}.js`);
        document.body.appendChild(script);
        this.scriptElement = script;
      }
  }
  initializeManifold(){
    const { manifold } = this.props;
    const { initializer, options } = manifold;
    this.Manifold = window[`${slug}$_{initializer}`](options);
  }
  locateFile(url){
    const { manifold } = this.props;
    const { urlPrefix, initializer, slug } = manifold;
    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.EMSCRIPTEN_HOST}manifold/${slug}/`;
    return host + url
  }
  print(...args){
    const text = Array.prototype.slice.call(args).join(' ');
  }
  printError(...args){
    const text = Array.prototype.slice.call(args).join(' ');
    if (0) { // XXX disabled for safety typeof dump == 'function') {
      dump(text + '\n'); // fast, straight to the real console
    } else {
      console.error(text);
    }
  }

  onContextLoss(e){
    alert('WebGL context lost. You will need to reload the page.');
    e.preventDefault();
  }

  renderLoadingMaybe(){
    return this.state.hideProgress ? null
          : <div className="manifold_media__loading"></div>
  }

  render(){
    const { manifold } = this.props;
    return (<div className="manifold_media__component">
      { this.renderLoadingMaybe() }
      { this.renderCanvases() }
      <div className="manifold_media__status">{ this.state.statusText }</div>
    </div>);
  }
}
const mapStateToProps = (state, ownProps) => {
  const manifold = state.media.getIn(['programs', ownProps.id]);
  return { manifold: manifold && manifold.toJS() }
}

const Manifold = connect(
  mapStateToProps
)(ManifoldMedia)

export { Manifold }
