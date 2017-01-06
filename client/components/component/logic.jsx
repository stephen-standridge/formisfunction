import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import '../../styles/component'

class ComponentLogic extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		// if the component has just loaded
		if (!this.props.component && nextProps.component) return true
		// otherwise
		return false
	}

	render(){
		const { component } = this.props;

		let component_type = component ? component.component_type : undefined;
		component_type = upperFirst(camelcase(component_type));
		console.warn(component_type)
		if (!component_type) {
			return <div className="component__not-found" />
		}
		if ( !components[component_type] ) {
			component_type = 'DefaultComponent';
		}
		const ComponentOfType = components[component_type];
		return <ComponentOfType {...this.props} />
	}
}

ComponentLogic.propTypes = {}

export default ComponentLogic