import {Nav} from '../nav'
import PathNav from '../path_nav'

class Main extends React.Component{
	render(){
		return (
	    <div className="main">
	    	<PathNav>
	    	</PathNav>
	    	<Nav />    		   	
    		{this.props.children}	    	
	    </div>
		)
	}
}

export default Main