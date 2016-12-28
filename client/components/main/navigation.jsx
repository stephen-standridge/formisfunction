import '../../styles/navigation'
import { Link } from 'react-router'

class Navigation extends React.Component {
	renderLinks() {	
		if(!this.props.navigation) return <div className='navigation__loading' />
		return this.props.navigation.map((link, index)=> <Link key={index} to={link.href}>{link.anchor}</Link> )		
	}
	render(){
		return <div className="main__navigation">
			<div className='navigation__links' >
				{this.renderLinks()}
			</div>
      <div>{this.props.children}</div>
    </div>
	}	
}
export default Navigation
