import { Link, browserHistory } from 'react-router'

export default React.createClass({
  render(){
    let homeClass = this.props.location.pathname.split('/')[1] == '' ? 'selected' : ''
    let contactClass = this.props.location.pathname.split('/')[1] == 'contact' ? 'selected' : ''
    return (
      <div>
        <Link to="/" className={`${homeClass}`} >Home</Link>
        <Link to="/contact" className={`${contactClass}`} >Contact</Link>
        <Link to="/test" className={`${contactClass}`} >Test</Link>
        <div>{this.props.children}</div>
      </div>
    )    
  }
})
