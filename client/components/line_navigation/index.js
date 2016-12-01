import { connect } from 'react-redux'
import LineNavigationLogic from './logic'
import * as actions from '../../actions/lines'


const mapStateToProps = (state) => {
	const { collection, selectedViewIndex, selectedLineIndex } = state.lines.toJS()

	let maxViewIndex = collection.length && collection.reduce((sum, line)=>{ 
		return sum > line.views.length ? sum : line.views.length 
	}, 0);
  return { maxViewIndex, lines:collection, selectedViewIndex, selectedLineIndex }
}

const LineNavigation = connect(
  mapStateToProps,
  actions
)(LineNavigationLogic)

export {LineNavigation}