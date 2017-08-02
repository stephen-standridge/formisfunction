import { connect } from 'react-redux'
import { ComponentLogic } from './logic'
import * as actions from '../../actions'

const mapStateToProps = (state, ownProps) => {
  let store;
	const component = state.components.get(ownProps.slug);
  if (component && state[component.get('component_type')]) {
    store = state[component.get('component_type')].toJS();
  }
  return { component: component && component.toJS(), store: store && store }
}

const ComponentCreator = connect(
	mapStateToProps,
  actions
)(ComponentLogic)

export { ComponentCreator }
