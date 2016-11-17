import ViewPresentation from './presentation';

class ViewLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.getOrFetchView;
		this.componentWillReceiveProps = this.getOrFetchView;  		
	}
	getParams(props=this.props){
		if(!props.routeParams || !props.routeParams.slug){ return 'index' }
		if(props.routeParams.slug){ return props.routeParams.slug }
	}
	getOrFetchView(newProps){
		this.props.get(this.getParams(newProps))
		//if slug, get slug or 404
		//if no slug, get index
	}
	render(){
		return <ViewPresentation />
	}
}

ViewLogic.propTypes = {}

export default ViewLogic