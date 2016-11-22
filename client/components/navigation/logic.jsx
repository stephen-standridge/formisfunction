import '../../styles/navigation'
import { Link } from 'react-router'

class NavigationLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.fetchNavigation;
	}
	renderLinks() {
		if(!this.props.navigation) return <div className='navigation__loading' />
		return this.props.navigation.links.map((link)=> <Link to={link.url}>link.href</Link> )		
	}
	fetchNavigation(){
		if(this.props.navigation) return
		this.props.fetch()
	}
	routeSlug() {
		return this.props.routeParams ? this.props.routeParams.slug : false
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
export default NavigationLogic
