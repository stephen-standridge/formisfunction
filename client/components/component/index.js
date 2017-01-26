import { connect } from 'react-redux'
import { ComponentLogic } from './logic'
import * as actions from '../../actions/component'

const mapStateToProps = (state, ownProps) => {
	const component = state.components.get(ownProps.slug);
  return { component: component && component.toJS() }
}

const ComponentCreator = connect( 
	mapStateToProps,
  actions
)(ComponentLogic)

export { ComponentCreator }