import makeClassNames from 'classnames'
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
		let component_type = component ? component.component_type + '_component' : undefined;
		console.warn(component)
		const classNames = makeClassNames(component_type || 'default_component', component && component.component_options)		
		
		component_type = upperFirst(camelcase(component_type));

		if (!component_type) {
			return <div className="component__not-found ${classNames}" />
		}
		if ( !components[component_type] ) {
			component_type = 'DefaultComponent';
		}
		const ComponentOfType = components[component_type];
		return <ComponentOfType {...this.props} classNames={classNames} />
	}
}

ComponentLogic.propTypes = {}

export default ComponentLogic