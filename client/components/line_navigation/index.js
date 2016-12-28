import { connect } from 'react-redux'
import LineNavigationLogic from './logic'
import * as actions from '../../actions/line_navigation'


const mapStateToProps = (state) => {
	const lines = state.lines.toJS();
	const { collection, selectedViewIndex, selectedLineIndex } = state.line_navigation.toJS();

	let maxViewIndex = collection.length && collection.reduce((sum, line)=>{ 
		return sum > line.views.length ? sum : line.views.length 
	}, 0);
  return { maxViewIndex, lines, selectedViewIndex, selectedLineIndex }
}

const LineNavigation = connect(
  mapStateToProps,
  actions
)(LineNavigationLogic)

export {LineNavigation}