import '../../styles/navigation'
import { Link } from './media'

class Navigation extends React.Component {
	renderLinks() {	
			console.warn(this.props)		
		if(!this.props.navigation) return <div className='navigation__loading' />
		return this.props.navigation.map((link, i)=> <Link slug={link.slug} key={i} /> )		
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
export { Navigation };
