import { connect } from 'react-redux';
import * as actions from '../../../actions/manifold';
var createManifold = require('@stephen.standridge/manifold');
import './manifold.scss';

class ManifoldMedia extends React.Component {
  constructor(props){
    super(props);
    this.Manifold = null;
    this.configuration;
    this.scriptElement;
    this.startManifold = this._startManifold.bind(this);
    this.stopManifold = this._stopManifold.bind(this);
    this.state = {
      hideProgress: false
    }
  }
  classNamesFor(part){
    const { classNames } = this.props;

    return `manifold-media__${part} ${classNames && classNames[part] || ''}`
  }
  getSlug(props=this.props) {
      const { manifold } = props;
      return manifold.slug;
  }
  getVersion(props=this.props) {
    const { manifold } = props;
    const { program_versions, current_version } = manifold;
    return program_versions && program_versions[current_version] || {};
  }
  getVersionId(props=this.props) {
    const { manifold } = props;
    const { program_versions, current_version } = manifold;
    return program_versions && program_versions[current_version] && program_versions[current_version].version_id;
  }
  componentDidMount(){
    this.Manifold = createManifold({}, {});
    this.componentDidUpdate({ manifold: {} })
  }
  componentWillUnmount(){
    const { manifold } = this.props;
    this.clearManifold(manifold);
  }
  componentDidUpdate(prevProps, prevState) {
      const { manifold, isActive, get_versions, updating } = this.props;
      if (!manifold) return;
      const prevManifold = prevProps.manifold;
      const prevActive = prevProps.isActive;
      const versionId = this.getVersionId();

      const { urlPrefix, version_id, slug } = manifold;

      if(manifold.slug != prevManifold.slug) {
        return get_versions(manifold);
      } else if (!updating) {
        if(versionId !== this.getVersionId(prevProps)){
          if(window[`${slug}_${versionId}`]){
            this.initializeManifold(prevProps);
          } else  {
            let script = document.createElement('script');
            script.onload = this.initializeManifold.bind(this, prevProps);
            script.src = this.configurationFile(manifold);
            document.body.appendChild(script);
            this.scriptElement = script;
          }
        } else {
          if(isActive && !prevActive) { this._startManifold(); }
          else if(!isActive && prevActive) { this._stopManifold(); }
          else if(isActive) { this._startManifold(); }
          else { this._stopManifold(); }

        }
      }

  }
  initializeManifold(prevProps){
    const { manifold, isActive } = this.props;
    const { options, slug } = manifold;
    const versionId = this.getVersionId();
    let configuration = window[`${slug}_${versionId}`];
    this.Manifold.load(`${slug}_${versionId}`, configuration, {
      locateFile: this.locateFile.bind(this),
      locateSource: this.locateFile.bind(this),
      onInitialize: this.clearManifold.bind(this, prevProps)
    }, this.refs[`${slug}_${versionId}`] );
    if (isActive) { this._startManifold(); }
    else { this._stopManifold(); }
  }
  _startManifold(){
    this.Manifold.start(`${this.getSlug()}_${this.getVersionId()}`)
  }
  _stopManifold(){
    this.Manifold.stop(`${this.getSlug()}_${this.getVersionId()}`)
  }
  clearManifold(prevProps){
    const { isActive } = this.props;
    const { manifold } = prevProps;
    const { slug } = manifold;
    const versionId = this.getVersionId(prevProps);
    if (!versionId || !slug) return;
    this.Manifold.unload(`${slug}_${versionId}`);
    if (this.sciptElement) {
      document.body.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    if(!isActive) {
      this._stopManifold();
    }
  }
  configurationFile(){
    const { configuration_url } = actions;
    return configuration_url(this.getSlug(), this.getVersion());
  }
  locateFile(url){
    const { file_url } = actions;
    return file_url(this.getSlug(), this.getVersion(), url)
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
    if (!manifold) return <div className={this.classNamesFor('not_found')} />

    const { options, slug } = manifold;
    const versionId = this.getVersionId();
    return <div className={`${slug}_piece manifold`} ref={`${slug}_${versionId}`}/>
  }

  render(){
    const { manifold } = this.props;
    return (<div className={this.classNamesFor('component') + `${this.getSlug()}_${this.getVersionId()} canvas_container`}>
      { this.renderLoadingMaybe() }
      { this.renderCanvases() }
      <div className={this.classNamesFor('status')}>{  }</div>
    </div>);
  }
}


const mapStateToProps = (state, ownProps) => {
  let manifold = state.media.getIn(['programs', ownProps.slug]);
  manifold = manifold.merge(state.manifold.get(ownProps.slug));
  const versions = manifold && manifold.getIn([ownProps.slug, 'program_versions']);

  return { manifold: manifold && manifold.toJS(), versions: versions && versions.toJS() };
}

const Manifold = connect(
  mapStateToProps,
  actions
)(ManifoldMedia)

export { Manifold }
