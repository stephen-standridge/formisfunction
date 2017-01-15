import makeClassNames from 'classnames'
import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import '../../styles/component'


class ComponentLogic extends React.Component {
	componentWillMount() {			
		const { component, slug, fetch } = this.props;
		if (!component && slug) fetch(slug)
	}
	componentWillReceiveProps(nextProps) {
		const { component, slug } = nextProps;
		if (!component && slug) this.props.fetch(slug)
	}
	componentParam() {
		const { slug, pathnames } = this.props;
		if (!pathnames) return;
		const { param, paramIndex } = this.context;
		return param( slug );
	}
	render(){
		const { component } = this.props;
		let component_type = component ? component.component_type + '_component' : undefined;
		const classNames = makeClassNames(component_type || 'default_component', component && component.options)		
		component_type = upperFirst(camelcase(component_type));
		if (!component_type) {
			return <div className={`component__not-found ${classNames}`} />
		}
		if ( !components[component_type] ) {
			component_type = 'DefaultComponent';
		}
		const ComponentOfType = components[component_type];
		return <ComponentOfType {...this.props} classNames={classNames} param={this.componentParam()}/>
	}
}

ComponentLogic.contextTypes = {
  param: React.PropTypes.func,
  paramIndex: React.PropTypes.func,
  router: React.PropTypes.object
};

ComponentLogic.propTypes = {}

export { ComponentLogic }