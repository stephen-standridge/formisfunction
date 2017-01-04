import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as views from '../view_types';
import '../../styles/view'

class ViewLogic extends React.Component {
	constructor(){
		super();
		this.componentWillMount = this.loadViewMaybe;
		this.componentWillReceiveProps = this.loadViewMaybe;		
	}
	loadViewMaybe(newProps){
		const { view, id, get } = this.props;
		if(!view) get(id)
	}

	shouldComponentUpdate(nextProps, nextState) {
		// if the view has just loaded
		if (!this.props.view && nextProps.view) return true
		// if the view has changed
		if (this.props.id !== nextProps.id) return true
		// otherwise
		return false
	}

	render(){
		const { view } = this.props;
		let view_type = view ? view.view_type : undefined;
		view_type = upperFirst(camelcase(view_type));
		if (!view_type) {
			return <div className="view__not-found" />
		}
		if ( !views[view_type] ) {
			view_type = 'DefaultView';
		}
		const ViewOfType = views[view_type];
		return <ViewOfType {...this.props} />
	}
}

ViewLogic.propTypes = {}

export default ViewLogic