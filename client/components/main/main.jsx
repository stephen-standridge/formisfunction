import Navigation from './navigation';
import {Component} from '../component';

class Main extends React.Component{
	render() {
		console.warn(this.props)
		const {location} = this.props;
		return (
	    <div className="main">
	    	<Component slug="site" location={location}/>
	    </div>
		)
	}
}

export { Main }