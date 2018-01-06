
import { connect } from 'react-redux';

class ScriptTag extends React.Component {
  constructor(props) {
    super(props);
    this.scriptElement = null;
  }
  shouldComponentUpdate(prevProps) {
    const { loaded, loading, error } = this.props;
    const prevLoaded = prevProps.loaded;
    const prevLoading = prevProps.loading;
    const prevError = prevProps.error;
    return loaded !== prevLoaded || loading !== prevLoading || error !== prevError;
  }
  componentWillUnmount() {
    if (this.scriptElement) {
      document.body.removeChild(this.scriptElement);
      this.scriptElement = null;
    }

  }
  createScriptElementMaybe() {
    if (this.scriptElement) return;
    const { script } = this.props;
    this.scriptElement = document.createElement('script');
    this.scriptElement.classList.add('hidden');
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.async = true;
    this.scriptElement.innerHTML = script;
    document.body.append(this.scriptElement);
  }
  render() {
    const { loaded, loading, error, onload } = this.props;
    if (loaded) {
      this.createScriptElementMaybe();
      onload && setTimeout(function(){ onload() }, 0);
    }

    return loading && <div className={'manifold-script__loading'}></div> ||
            error && <div className={'manifold-script__error'}>{error.message}</div> || null
  }
}


const mapStateToProps = (state, ownProps) => {
  let configuration = state.manifold.getIn(['configurations', ownProps.slug, ownProps.version_id]);
  let onload = ownProps.onload;
  return configuration && configuration.merge(ownProps).toJS() || {};
}

const ManifoldConfiguration = connect(
  mapStateToProps
)(ScriptTag)

export { ManifoldConfiguration }
