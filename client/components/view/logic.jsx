import ViewPresentation from './presentation';

class ViewLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.getOrFetchView;
		this.componentWillReceiveProps = this.getOrFetchView;  		
	}
	getOrFetchView(newProps){
		this.props.get(this.props.slug)
		//if slug, get slug or 404
		//if no slug, get index
	}
	render(){
		return <ViewPresentation />
	}
}

ViewLogic.propTypes = {}

export default ViewLogic