import { ManifoldConfiguration } from './configuration';
import { connect } from 'react-redux';
import * as actions from '../../../actions/manifold';
var createManifold = require('@stephen.standridge/manifold');
import './manifold.scss';
const M = createManifold({}, {});
class ManifoldMedia extends React.Component {
  constructor(props){
    super(props);
    this.Manifold = M;
    this.configuration;
    this.startManifold = this._startManifold.bind(this);
    this.stopManifold = this._stopManifold.bind(this);
    this.initializeManifold = this._initializeManifold.bind(this);
  }
  classNamesFor(part){
    const { classNames } = this.props;
    return `manifold-media__${part} ${classNames && classNames[part] || ''}`
  }

  getSlug(props=this.props) {
      const { manifold } = props;
      return manifold && manifold.slug || 'ERROR-no-slug';
  }

  getVersion(props=this.props) {
    const { manifold } = props;
    if (!manifold) return 'ERROR-no-version';
    const { program_versions, current_version } = manifold;
    return program_versions && program_versions[current_version] || {};
  }

  getVersionId(props=this.props) {
    const { manifold } = props;
    if (!manifold) return 'ERROR-no-version-id';
    const { program_versions, current_version } = manifold;
    return program_versions && program_versions[current_version] && program_versions[current_version].version_id;
  }

  componentDidMount(){
    this.componentDidUpdate({ manifold: {} })
  }

  componentWillUnmount(){
    this.clearManifold(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    const { manifold, isActive, get_versions, get_configuration, loading } = this.props;
    if (!manifold) return;
    const prevManifold = prevProps.manifold || {};
    const prevActive = prevProps.isActive;
    const versionId = this.getVersionId();

    const { urlPrefix, version_id, slug } = manifold;

    if (manifold.slug != prevManifold.slug) return get_versions(manifold);
    if (loading) return;
    if (versionId !== this.getVersionId(prevProps)) return get_configuration(manifold, this.getVersion());

    if(isActive && !prevActive) { this._startManifold(); }
    else if(!isActive && prevActive) { this._stopManifold(); }
    else if(isActive) { this._startManifold(); }
    else { this._stopManifold(); }
  }

  _initializeManifold(prevProps) {
    const { manifold, isActive } = this.props;
    const { slug } = manifold;
    const versionId = this.getVersionId();

    let configuration = window[`${slug}_${versionId}`];
    this.Manifold.load(`${slug}_${versionId}`, configuration, {
      locateFile: this.locateFile.bind(this),
      locateSource: this.locateFile.bind(this),
      // onInitialize: this.clearManifold.bind(this, prevProps)
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

  clearManifold(props=this.props){
    const { manifold } = props;
    const { slug } = manifold;
    const versionId = this.getVersionId(props);
    if (!versionId || !slug) return;
    this.Manifold.unload(`${slug}_${versionId}`);
  }

  configurationFile(){
    const { configuration_url } = actions;
    return configuration_url(this.getSlug(), this.getVersion());
  }

  locateFile(url){
    const { file_url } = actions;
    return file_url(this.getSlug(), this.getVersion(), url)
  }

  render(){
    const { manifold, isActive } = this.props;
    if (!manifold) return <div className="manifold_media__loading"></div>;
    const { options, slug } = manifold;

    return (<div className={this.classNamesFor('component') + `${this.getSlug()}_${this.getVersionId()} canvas_container`}>
      <div className={`${slug}_piece manifold`} ref={`${slug}_${this.getVersionId()}`}>
          { this.getVersionId() && <ManifoldConfiguration isActive={isActive} slug={this.getSlug()} version_id={this.getVersionId()} onload={this.initializeManifold}/>}
      </div>
    </div>);
  }
}


const mapStateToProps = (state, ownProps) => {
  let manifold = state.media.getIn(['programs', ownProps.slug]);
  manifold = manifold && manifold.merge(state.manifold.get(ownProps.slug));
  return { manifold: manifold && manifold.toJS() };
}

const Manifold = connect(
  mapStateToProps,
  actions
)(ManifoldMedia)

export { Manifold }
