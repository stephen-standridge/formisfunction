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
      const { manifold } = this.props;
      const prevManifold = prevProps.manifold;
      const { urlPrefix, initializer, slug } = manifold;
      if(initializer !== prevManifold.initializer){
        if(window[`${slug}_${initializer}`]){
          this.initializeManifold(prevManifold);
        } else  {
          let script = document.createElement('script');
          script.onload = this.initializeManifold.bind(this, prevManifold);
          script.src = this.configurationFile(`configuration.js`);
          document.body.appendChild(script);
          this.scriptElement = script;
        }
      }
  }
  initializeManifold(prevManifold){
    const { manifold } = this.props;
    const { initializer, options, slug } = manifold;
    let configuration = window[`${slug}_${initializer}`];
    this.Manifold.load(`${slug}_${initializer}`, configuration, {
      locateFile: this.locateFile.bind(this),
      locateSource: this.locateFile.bind(this),
      onInitialize: this.clearManifold.bind(this, prevManifold)
    });
    document.body.removeChild(this.scriptElement);
  }
  _startManifold(){
    const { manifold } = this.props;
    const { initializer, slug } = manifold;
    this.Manifold.start(`${slug}_${initializer}`)
  }
  _stopManifold(){
    const { manifold } = this.props;
    const { initializer, slug } = manifold;
    this.Manifold.stop(`${slug}_${initializer}`)
  }
  clearManifold(manifold){
    const { initializer, slug } = manifold;
    if (!initializer || !slug) return;
    this.Manifold.unload(`${slug}_${initializer}`);
  }
  configurationFile(url){
    const { manifold } = this.props;
    const { urlPrefix, initializer, slug } = manifold;

    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${initializer}/`;
    return host + url
  }
  locateFile(url){
    const { manifold } = this.props;
    const { urlPrefix, initializer, slug } = manifold;

    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${initializer}/assets/`;
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
    console.warn(this.Manifold);
    return;
  }

  render(){
    const { manifold } = this.props;
    return (<div className="manifold_media__component">
      { this.renderLoadingMaybe() }
      { this.renderCanvases() }
      <div className="manifold_media__controls">
        <div className="manifold_media__stop" onClick={this.stopManifold}>stop</div>
        <div className="manifold_media__start" onClick={this.startManifold}>start</div>
      </div>
      <div className="manifold_media__status">{  }</div>
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
