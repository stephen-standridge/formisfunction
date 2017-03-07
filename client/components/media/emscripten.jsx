import { connect } from 'react-redux'

class Emscripten extends React.Component {
  constructor(props){
    super(props);
    this.Module = {
      preRun: [],
      postRun: [],
      locateFile: this.locateFile.bind(this),
      print: this.print.bind(this),
      printErr: this.printError.bind(this),
      canvas: this.canvasElement,
      setStatus: this.setStatus.bind(this),
      monitorRunDependencies: this.monitorRunDependencies.bind(this);
    };
    window.onerror = function(event) {
      // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
      this.Module.setStatus('Exception thrown, see JavaScript console');
      this.Module.setStatus = function(text) {
        if (text) this.Module.printErr('[post-exception status] ' + text);
      };
      return {
        totalDependencies: 0,
        loaded: null,
        total: null,
        hideProgress: false,
        hideSpinner: false,
        statusText: 'Downloading...'
      };
    }
  }
  componentWillMount(){
    this.componentWillReceiveProps(this.props, true)
  }
  componentWillReceiveProps(nextProps, load=false) {
      if((nextProps.memoryInitializer !== this.props.memoryInitializer) || load){
        let xhr = this.Module['memoryInitializerRequest'] = new XMLHttpRequest();
        xhr.open('GET', process.env.EMSCRIPTEN_HOST + nextProps.memoryInitializer, true);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
      }
      if((nextProps.initializerScript !== this.props.initializerScript) || load){
        //remove old element
        let script = document.createElement('script');
        script.src = process.env.EMSCRIPTEN_HOST + nextProps.initializerScript;
        document.body.appendChild(script);
      }
  }
  locateFile(url){
    return process.env.EMSCRIPTEN_HOST + url
  }
  print(...args){
    const text = Array.prototype.slice.call(args).join(' ');
    console.log(text);
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
    if (!this.Module.setStatus.last) this.Module.setStatus.last = { time: Date.now(), text: '' };
    if (text === this.Module.setStatus.text) return;
    let m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    if (m) {
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
    this.setState((prevState) =>{
      return Object.assign( prevState, { totalDependencies: Math.max(totalDependencies, left) });
    }, (newState)=>{
      this.Module.setStatus(left ?
        'Preparing... (' + (newState.totalDependencies-left) + '/' + newState.totalDependencies + ')'
        : 'All downloads complete.');
    })
  }
  render(){
    const { emscripten } = this.props;
    return <div>
      { this.hideProgress ?  null : <div className="emscripten__loading">{this.state.loaded + "/" + this.state.total}</div> }
      <div className="emscripten__status">{this.state.status}</div>
      <canvas ref={(canv) => {
        this.canvasElement = canv;
        this.canvasElement.addEventListener("webglcontextlost", this.onContextLoss.bind(this), false);
      }} />
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const emscripten = state.media.getIn(['emscriptens', ownProps.slug]);

  return { emscripten: emscripten && emscripten.toJS() }
}

const Emscripten = connect(
  mapStateToProps
)(Emscripten)

export { Emscripten }
