import '../../styles/navigation'
import { Link } from '../media'

class Navigation extends React.Component {
	renderLinks() {	
		const { navigation } = this.props;
		console.warn(navigation)
		if(!navigation) return <div className='navigation__loading' />
		return navigation.map((link, index) => <Link key={index} slug={link.slug} /> )		
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
export { Navigation }
