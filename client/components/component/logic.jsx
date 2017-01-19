import makeClassNames from 'classnames'
import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import '../../styles/component'


class ComponentLogic extends React.Component {
	constructor(props) {
		super(props);
		this.componentWillReceiveProps = this.handleProps;
		this.componentWillMount = this.handleProps;
		this.setComponentState = this._setComponentState.bind(this);
		this.getComponentState = this._getComponentState.bind(this);
		this.state = { current: undefined };
	}

	componentWillUnmount() {
		const { slug, component } = this.props;
		const options = component && component.options;
		const withHistory = options && options.history;
		const { unregister, isRegistered, getParam, setParam } = this.context;
		const currentState = withHistory ? getParam(slug) : this.state.current;

		if (withHistory && isRegistered(slug)) {
			setParam(slug, '')
			unregister(slug)
		}
	}

	handleProps({ component, slug, fetch }= this.props) {
		const { register, setParam, getParam, isRegistered, unregister } = this.context;		
		if (!component && slug) fetch(slug);
		const options = component && component.options;
		const withHistory = options && options.history;

		const currentComponent = this.props.component;
		const currentSlug = this.props.slug;
		const currentOptions = currentComponent && currentComponent.options;
		const withHistoryCurrently = currentOptions && currentOptions.history;

		if (withHistory && !isRegistered(slug)) {
			if (isRegistered(currentSlug)) {
				//if the current component is registered, switch the registration it
				register(slug, otherSlug);
			} else {
				register(slug);
			}
		}

		const currentState = withHistory ? getParam(slug) : this.state.current;

		if (component && !currentState) {
			const current = options && options.initial_state || 'default';
			this.setState({ current }, () =>{ if (withHistory) setParam(slug, current) })
		}
	}

	_setComponentState(current) {
		const { slug, component } = this.props;
		const { setParam } = this.context;
		const withHistory = component && component.options && component.options.history;
		return this.setState({ current }, () =>{ if (withHistory) setParam(slug, current) })
	}

	_getComponentState() {
		const { slug, component } = this.props;
		const { getParam } = this.context;		
		const { current } = this.state;
		const withHistory = component && component.options && component.options.history;		
		return withHistory ? getParam(slug) : current;
	}

	render(){
		const { component } = this.props;
		let component_type = component ? component.component_type + '_component' : undefined;
		const classNames = makeClassNames(component_type || 'default_component')		
		component_type = upperFirst(camelcase(component_type));
		if (!component_type) {
			return <div className={`component__not-found ${classNames}`} />
		}
		if ( !components[component_type] ) {
			component_type = 'DefaultComponent';
		}
		const ComponentOfType = components[component_type];
		if (!component) return <div className="component__loading" />
		return <ComponentOfType {...this.props} setComponentState={this.setComponentState} classNames={classNames} componentState={this.getComponentState()}/>
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