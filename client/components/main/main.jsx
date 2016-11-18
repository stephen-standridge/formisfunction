import {Navigation} from '../navigation';
import {MainVideo} from '../main_video';

class Main extends React.Component{
	render(){		
		return (
	    <div className="main">
    		{this.props.children}	 
    		<MainVideo /> 	
	    	<Navigation />    		   	
	    </div>
		)
	}
}

export default Main