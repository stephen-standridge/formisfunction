import { Link } from 'react-router'
import CSS from '../../styles/main_nav'

export default React.createClass({
  render(){
    return (
      <div className="main__navigation">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/test">Test</Link>
        <div>{this.props.children}</div>
      </div>
    )    
  }
})
