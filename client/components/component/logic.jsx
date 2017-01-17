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
		this.setComponentState = this._setComponentState.bind(this);
		this.getComponentState = this._getComponentState.bind(this);
		this.state = { current: undefined };
	}
	handleProps({ component, slug, fetch }= this.props) {
		const { register, setParam, getParam, isRegistered } = this.context;		
		if (!component && slug) fetch(slug);
		const options = component && component.options;
		const withHistory = options && options.history;

		if( withHistory && !isRegistered(slug)) {
			register(slug);
		}

		const currentState = this.getComponentState();
		if (component && !currentState) {
			const current = options && options.initial_state || 'default';
			this.setComponentState(current);
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
		const classNames = makeClassNames(component_type || 'default_component', component && component.options)		
		component_type = upperFirst(camelcase(component_type));
		if (!component_type) {
			return <div className={`component__not-found ${classNames}`} />
		}
		if ( !components[component_type] ) {
			component_type = 'DefaultComponent';
		}
		const ComponentOfType = components[component_type];
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