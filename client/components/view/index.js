import { connect } from 'react-redux'
import ViewLogic from './logic'
import * as actions from '../../actions/view'

const mapStateToProps = (state, ownProps) => {
	let view = state.views.get(ownProps.slug)
	view = view && view.toJS()
  return { view }
}

const View = connect( 
	mapStateToProps,
  actions
)(ViewLogic)

export {View}