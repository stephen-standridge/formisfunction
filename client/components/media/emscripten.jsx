import { connect } from 'react-redux'

class EmscriptenMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: null,
      total: null,
      hideProgress: false,
      hideSpinner: false,
      statusText: 'Downloading...',
      moduleIndex: 0
    };
    this.Module;
    this.scriptElement;
  }

  componentDidMount(){
    window.onerror = function(e) {
      // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
      // Module.setStatus('Exception thrown, see JavaScript console');
      // console.warn(e);
    }
    this.componentDidUpdate({ emscripten: {} })
  }
  componentDidUpdate(prevProps, prevState) {
      if (!this.canvasElement) return;
      const { emscripten } = this.props;
      const prevEmscripten = prevProps.emscripten;
      const { urlPrefix, slug } = emscripten;
      if(slug !== prevEmscripten.slug){
        this.createModule();

        let script = document.createElement('script');
        script.onload = this.initializeModule.bind(this)
        script.src = this.locateFile(`${slug}.js`);
        document.body.appendChild(script);
        this.scriptElement = script;
      }
  }
  initializeModule(){
    const { emscripten } = this.props;
    this.Module = window[emscripten.slug](this.Module);
  }
  createModule(){
    this.Module = {
      preRun: [],
      postRun: [],
      filePackagePrefixURL: this.locateFile(''),
      locateFile: this.locateFile.bind(this),
      print: this.print.bind(this),
      printErr: this.printError.bind(this),
      canvas: this.canvasElement,
      setStatus: this.setStatus.bind(this),
      monitorRunDependencies: this.monitorRunDependencies.bind(this)
    };
  }
  locateFile(url){
    const { emscripten } = this.props;
    const { urlPrefix, slug, version_id } = emscripten;
    const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.EMSCRIPTEN_HOST}emscripten/${slug}/${version_id}/`;
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
  setStatus(text) {
    if (!this.Module.setStatus.last) {
      this.Module.setStatus.last = { time: Date.now(), text: '' };
    }
    let m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    if (m && m.length) {
      text = m[1];
      this.setState({
        loaded: parseInt(m[2])*100,
        total: parseInt(m[4])*100,
        hideProgress: false,
        hideSpinner: false,
        statusText: text
      })
    } else {
      this.setState({
        loaded: null,
        total: null,
        hideProgress: true,
        hideSpinner: true,
        statusText: text
      })
    }
  }
  onContextLoss(e){
    alert('WebGL context lost. You will need to reload the page.');
    e.preventDefault();
  }
  monitorRunDependencies(left){
    this.setState((prevState) => {
      let total = Math.max(prevState.total, left);
      return Object.assign( prevState, { total, loaded: total - left });
    }, ()=>{
      const { total } = this.state;
      this.Module.setStatus(left ? `Preparing... (${total-left}/${total})` : 'All downloads complete.');
    })
  }

  renderLoadingMaybe(){
    return this.state.hideProgress ? null
          : <div className="emscripten_media__loading">{`${this.state.loaded}/${this.state.total}`}</div>
  }

  render(){
    const { emscripten } = this.props;
    return (<div className="emscripten_media__component">
      { this.renderLoadingMaybe() }
      <canvas ref={(canv) => {
        this.canvasElement = canv;
        this.canvasElement && this.canvasElement.addEventListener("webglcontextlost", this.onContextLoss.bind(this), false);
      }} />
      <div className="emscripten_media__status">{ this.state.statusText }</div>
    </div>);
  }
}
const mapStateToProps = (state, ownProps) => {
  const emscripten = state.media.getIn(['programs', ownProps.id]);
  return { emscripten: emscripten && emscripten.toJS() }
}

const Emscripten = connect(
  mapStateToProps
)(EmscriptenMedia)

export { Emscripten }
