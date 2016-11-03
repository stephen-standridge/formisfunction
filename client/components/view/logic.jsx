import ViewPresentation from './presentation';

class ViewLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.getOrFetchView;
		this.componentWillUpdate = this.getOrFetchView;  		
	}
	getOrFetchView(){
		this.props.get()
		//if slug, get slug or 404
		//if no slug, get index
	}
	render(){
		return <div></div>
	}
}

ViewLogic.propTypes = {}

export default ViewLogic