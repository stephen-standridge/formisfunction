import ViewPresentation from './presentation';

class ViewLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.getOrFetchView;
		this.componentWillUpdate = this.getOrFetchView;  		
	}
	getOrFetchView(){
		console.log('fetch view')
		//if slug, get slug or 404
		//if no slug, get index
	}
	render(){
		return <div></div>
	}
}

ViewLogic.propTypes = {
   // props
   userId: PropTypes.number.isRequired,

   // state
   background: PropTypes.object,

   // dispatch
   loadBackground: PropTypes.func.isRequired
}

export default ViewLogic