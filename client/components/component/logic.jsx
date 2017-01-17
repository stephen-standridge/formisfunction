import makeClassNames from 'classnames'
import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import '../../styles/component'


class ComponentLogic extends React.Component {
	constructor(props) {
		super(props);
		this.componentWillMount = this.handleProps;
		this.componentWillReceiveProps = this.handleProps;
		this.state = { current: undefined };
	}
	handleProps({ component, slug, fetch }= this.props) {
		const { register, unregister, setParam, getParam, isRegistered } = this.context;		
		if (!component && slug) fetch(slug);
		const options = component && component.options;
		const shouldUpdateHistory = options && options.history;
		// if (component && component.options.history) {
		// 	if (!getParam(slug)) setParam(slug, 'hello');					
		// }
		// if (slug !== this.props.slug) {
		// 	unregister(this.props.slug);
		// 	register(slug);
		// }
		if( shouldUpdateHistory && !isRegistered(slug)) {
			console.warn(shouldUpdateHistory, !isRegistered(slug), slug)
			const otherComponent = this.props.component;
			const otherUpdateHistory = otherComponent && otherComponent.options.history;			
			if (shouldUpdateHistory && otherUpdateHistory) {
				register(slug, this.props.slug);	
			} else if (otherUpdateHistory && isRegistered(this.props.slug)) {
				unregister(this.props.slug);
			} else {
				register(slug);
			}			
		}

		const currentState = shouldUpdateHistory ? getParam(slug) : this.state.current;
		if (!currentState) {
			console.warn(currentState)
			const current = options && options.initial_state || 'default';
			this.setState({ current }, () =>{ if (shouldUpdateHistory) setParam(slug, current) })
		}
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
  getParam: React.PropTypes.func,
  setParam: React.PropTypes.func,
  register: React.PropTypes.func,
  unregister: React.PropTypes.func,
  isRegistered: React.PropTypes.func
};

ComponentLogic.propTypes = {}

export { ComponentLogic }