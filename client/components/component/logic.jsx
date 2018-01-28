import makeClassNames from 'classnames'
import { upperFirst, findIndex } from 'lodash';
import camelcase from 'lodash.camelcase'
import * as components from '../component_types';
import { CreateComponent } from './create/create.jsx';
import './component.scss'
import './piece.scss'

components.CreateComponent = CreateComponent;


class ComponentLogic extends React.Component {
	constructor(props) {
		super(props);
		this.componentWillReceiveProps = this.handleProps;
		this.componentDidMount = this.handleProps;
		this.setComponentState = this._setComponentState.bind(this);
		this.getCurrentState = this._getCurrentState.bind(this);
		this.getNextState = this._getNextState.bind(this);
		this.getPrevState = this._getPrevState.bind(this);
		this.state = { current: -1 };
	}

	componentWillUnmount() {
		const { slug, component, withHistory } = this.props;
		const options = component && component.options;
		const { unregister, isRegistered, getParam, setParam } = this.context;
		const currentState = withHistory ? getParam(slug) : this.state.current;

		if (withHistory && isRegistered(slug)) {
			setParam(slug, '')
			unregister(slug)
		}
	}

	handleProps(nextProps=this.props) {
		const { component, slug, fetch, requested, withHistory } = nextProps;
		const { register, setParam, getParam, isRegistered, unregister } = this.context;
		if (component && component.error) return;
		const prevComponent = this.props.component;
		const prevSlug = this.props.slug;
		const prevWithHistory = this.props.withHistory;

		if (!component || component.needsLoad) {
			if (!isRegistered(slug)) {
				if (prevWithHistory && !withHistory) {
					if (getParam(prevSlug)) setParam(prevSlug, '');
					unregister(prevSlug);
				} else if (withHistory && slug === prevSlug) {
					if (isRegistered(slug)) return
					register(slug);
				} else if (withHistory) {
					if (getParam(prevSlug)) setParam(prevSlug, '');
					register(slug, isRegistered(prevSlug) && prevSlug);
				}
			}
			return fetch(slug);
		}

		const currentState = withHistory && getParam(slug);

		if (component && !currentState) {
			const { options, states } = component;
			const initial = options && options.initial_state || null;
			if (withHistory && initial) {
				setParam(slug, initial)
			} else {
				const current = initial && findIndex(states, function(s){ return s == initial });
				if (current >= 0) this.setState({ current })
			}
		}
	}

	_setComponentState(current) {
		const { slug, component, withHistory } = this.props;
		const { states } = component;
		const { setParam } = this.context;
		if (withHistory) {
			return setParam(slug, typeof current === 'string' ? current : states[current])
		}
		return this.setState({ current });
	}

	_getCurrentState() {
		const { slug, component, withHistory } = this.props;
		const { states } = component;
		const { getParam } = this.context;
		let current;
		if (withHistory) {
			current = findIndex(states, function(s) { return s == getParam(slug) });
		} else {
			current = this.state.current;
		}
		return current;
	}

	_getPrevState() {
		const { slug, component, withHistory } = this.props;
		const { states } = component;
		const { getParam } = this.context;
		let current;

		if (withHistory) {
			current = findIndex(states, function(s) { return s == getParam(slug) });
		} else {
			current = this.state.current;
		}

    return (current - 1) >= 0 ? (current - 1) : states.length - 1;
	}

	_getNextState() {
		const { slug, component, withHistory } = this.props;
		const { states } = component;
		const { getParam } = this.context;
		let current;

		if (withHistory) {
			current = findIndex(states, function(s) { return s == getParam(slug) });
		} else {
			current = this.state.current;
		}

    return (current + 1) < states.length ? (current + 1) : 0;
	}

	render(){
		const { component, children, slug } = this.props;
		const { getParams, getParam } = this.context;
		let states = component && component.states || [];
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
					 	toNextState={this.setComponentState.bind(this, this.getNextState())}
					 	toPrevState={this.setComponentState.bind(this, this.getPrevState())}
						setComponentState={this.setComponentState}
						classNames={classNames}
						params={getParams()}
						currentSlug={states[this.getCurrentState()]}
						nextSlug={states[this.getNextState()]}
						prevSlug={states[this.getPrevState()]}>
					{ children }
					</ComponentOfType>)
	}
}

ComponentLogic.contextTypes = {
	getParams: React.PropTypes.func,
  getParam: React.PropTypes.func,
  setParam: React.PropTypes.func,
  register: React.PropTypes.func,
  unregister: React.PropTypes.func,
  isRegistered: React.PropTypes.func
};

ComponentLogic.propTypes = {}

export { ComponentLogic }
