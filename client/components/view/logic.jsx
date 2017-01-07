import { upperFirst } from 'lodash';
import makeClassNames from 'classnames'
import camelcase from 'lodash.camelcase'
import * as views from '../view_types';
import { Component } from '../component';
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

	renderComponents() {
		const { view } = this.props;
		if (!view.components.length) return;
		return view.components.map((c)=> { return <Component key={c.id} component={c} /> })
	}

	render(){
		const { view, onPrev, onNext } = this.props;
		let view_type = view ? view.view_type + '_view' : undefined;
		console.warn(view_type)
		const classNames = makeClassNames(view_type || 'default_view', view && view.view_options)
		view_type = upperFirst(camelcase(view_type));
		if (!view_type) {
			return <div className="view__not-found" />
		}

		if ( !views[view_type] ) {
			view_type = 'DefaultView';
		}
		const ViewOfType = views[view_type];
		return <ViewOfType view={view} onPrev={onPrev} onNext={onNext} classNames={classNames} >
			{ this.renderComponents() }
		</ViewOfType>
	}
}

ViewLogic.propTypes = {}

export default ViewLogic