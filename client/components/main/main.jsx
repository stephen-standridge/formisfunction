import Navigation from './navigation';

class Main extends React.Component{
	componentWillMount() {
		this.props.fetch();
	}
	render() {		
		return (
	    <div className="main">
    		{this.props.children}	 
	    	<Navigation navigation={this.props.navigation} />
	    </div>
		)
	}
}

export default Main