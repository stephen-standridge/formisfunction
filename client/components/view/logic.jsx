import View from './view';

class ViewLogic extends React.Component {
	constructor(){
		super();
		this.componentWillMount = this.loadViewMaybe;
		this.componentWillReceiveProps = this.loadViewMaybe;		
	}
	loadViewMaybe(newProps){

		if(!this.props.view) this.props.get(this.props.id)
	}
	render(){
		return <View {...this.props}/>
	}
}

ViewLogic.propTypes = {}

export default ViewLogic