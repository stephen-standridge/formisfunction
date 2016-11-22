import {Navigation} from '../navigation';

class Main extends React.Component{
	render(){		
		return (
	    <div className="main">
    		{this.props.children}	 
	    	<Navigation />
	    </div>
		)
	}
}

export default Main