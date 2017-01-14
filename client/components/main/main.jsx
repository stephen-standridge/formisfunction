import Navigation from './navigation';
import {Component} from '../component';

class Main extends React.Component{
	render() {
		return (
	    <div className="main">
	    	<Component slug="site" />
	    </div>
		)
	}
}

export { Main }