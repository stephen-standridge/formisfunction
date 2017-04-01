import { connect } from 'react-redux';
var createManifold = require('@stephen.standridge/manifold');

class ManifoldMedia extends React.Component {
  constructor(props){
    super(props);
    this.Manifold = createManifold();
    this.configuration;
    this.scriptElement;
    this.startManifold = this._startManifold.bind(this);
    this.stopManifold = this._stopManifold.bind(this);
    this.state = {
      hideProgress: false
    }
  }
  componentDidMount(){
    this.componentDidUpdate({ manifold: {} })
  }
  componentWillUnmount(){
    const { manifold } = this.props;
    this.clearManifold(manifold);
  }
  componentDidUpdate(prevProps, prevState) {
      const { manifold, isActive } = this.props;
      const prevManifold = prevProps.manifold;
      const prevActive = prevProps.isActive;
      const { urlPrefix, version_id, slug } = manifold;
      if(version_id !== prevManifold.version_id){
        if(window[`${slug}_${version_id}`]){
          this.initializeManifold(prevManifold);
        } else  {
          let script = document.createElement('script');
          script.onload = this.initializeManifold.bind(this, prevManifold);
          script.src = this.configurationFile(`configuration.js`);
          document.body.appendChild(script);
          this.scriptElement = script;
        }
      } else {
        if(isActive && !prevActive){
          this._startManifold();
        }
        if(!isActive && prevActive){
          this._stopManifold();
        }
      }
  }
  initializeManifold(prevManifold){
    const { manifold } = this.props;
    const { version_id, options, slug } = manifold;
    let configuration = window[`${slug}_${version_id}`];
    this.Manifold.load(`${slug}_${version_id}`, configuration, {
      locateFile: this.locateFile.bind(this),
      locateSource: this.locateFile.bind(this),
      onInitialize: this.clearManifold.bind(this, prevManifold)
    });
  }
  _startManifold(){
    const { manifold } = this.props;
    const { version_id, slug } = manifold;
    this.Manifold.start(`${slug}_${version_id}`)
  }
  _stopManifold(){
    const { manifold } = this.props;
    const { version_id, slug } = manifold;
    this.Manifold.stop(`${slug}_${version_id}`)
  }
  clearManifold(manifold){
    const { isActive } = this.props;
    const { version_id, slug } = manifold;
    if (!version_id || !slug) return;
    this.Manifold.unload(`${slug}_${version_id}`);
    if (this.sciptElement) {
      document.body.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    if(!isActive) {
      this._stopManifold();
    }
  }
  configurationFile(url){
    const { manifold } = this.props;
    const { urlPrefix, version_id, slug } = manifold;

    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${version_id}/`;
    return host + url
  }
  locateFile(url){
    const { manifold } = this.props;
    const { urlPrefix, version_id, slug } = manifold;

    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${version_id}/assets/`;
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
  renderCanvases(){
    const { manifold } = this.props;
    const { slug } = manifold;
    return <div className={`${slug}_piece manifold`} />
  }

  render(){
    const { manifold } = this.props;
    return (<div className="manifold_media__component">
      { this.renderLoadingMaybe() }
      { this.renderCanvases() }
      <div className="manifold_media__status">{  }</div>
    </div>);
  }
}
const mapStateToProps = (state, ownProps) => {
  const manifold = state.media.getIn(['programs', ownProps.slug]);
  return { manifold: manifold && manifold.toJS() }
}

const Manifold = connect(
  mapStateToProps
)(ManifoldMedia)

export { Manifold }
