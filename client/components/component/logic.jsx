import makeClassNames from 'classnames'
import { upperFirst } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import './component.scss'
import './piece.scss'


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

	handleProps({ component, slug, fetch, requested } = this.props) {
		const { register, setParam, getParam, isRegistered, unregister } = this.context;
		if (component && component.error) return;
		if (!component || component.needsLoad) {
			requested(slug);
			fetch(slug);
		}
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
			const current = options && options.initial_state || null;
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
		const { component, children } = this.props;
		if (!component) {
			return <div className={`component__container component__loading`}>{ children }</div>;
		}

		let component_type = component ? component.component_type + '_component' : undefined;

		const classNames = makeClassNames(component_type ||
				(process.env.NODE_ENV == 'DEVELOPMENT' && 'create_component') ||
				'not_found_component', 'component__wrapper');

		component_type = upperFirst(camelcase(component_type));

		if (!components[component_type]) {
			component_type = process.env.NODE_ENV == 'DEVELOPMENT' && 'CreateComponent' || 'NotFoundComponent';
		}

		const ComponentOfType = components[component_type];
		return ((component.error && <div className="component__error">{component.error.message}</div>) ||
					 (component.needsLoad && <div className="component__loading"></div>) ||
					 (component.loading && <div className="component__loading"></div>) ||
					 <ComponentOfType {...this.props}
						setComponentState={this.setComponentState}
						classNames={classNames}
						componentState={this.getComponentState()}>
					{ children }
					</ComponentOfType>)
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
