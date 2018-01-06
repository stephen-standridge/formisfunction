import makeClassNames from 'classnames'
import { upperFirst } from 'lodash';
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
		this.componentWillMount = this.handleProps;
		this.setComponentState = this._setComponentState.bind(this);
		this.getComponentState = this._getComponentState.bind(this);
		this.state = { current: undefined };
	}

	componentWillUnmount() {
		const { slug, component, withHistory } = this.props;
		const options = component && component.options;
		const { unregister, isRegistered, getParam, setParam } = this.context;
		const currentState = withHistory ? getParam(slug) : this.state.current;

		console.warn('unmounting', slug)
		if (withHistory && isRegistered(slug)) {
			console.warn('unregistering', slug)
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
					/*unregister*/
					console.warn('==========> unregistering', slug)
					if (getParam(prevSlug)) setParam(prevSlug, '');
					unregister(prevSlug);
				}
				if (prevWithHistory && withHistory) {
					console.warn('==========> register other', slug, prevSlug)
					if (getParam(prevSlug)) setParam(prevSlug, '');
					register(slug, isRegistered(prevSlug) && prevSlug);
				}
				if (!prevWithHistory && withHistory) {
					console.warn('==========> registering', slug)
					register(slug, false);
				}
				if (!prevWithHistory && !withHistory) {
					console.warn('==========> nothing')
					/*nothing*/
				}
			}
			console.warn(slug, this.props.component && this.props.component.slug)
			return fetch(slug);
		}

		const { options } = component;
		const currentState = withHistory ? getParam(slug) : this.state.current;
		if (component && !currentState) {
			const current = options && options.initial_state || null;
			this.setState({ current }, () =>{
				if (component.loading) return;
				if (withHistory) setParam(slug, current)
			})
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
		const { component, children, slug } = this.props;
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
