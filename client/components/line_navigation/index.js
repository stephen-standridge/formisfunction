import { connect } from 'react-redux'
import LineNavigationLogic from './logic'
import * as actions from '../../actions/lines'

const mapStateToProps = (state) => {
	let lines = state.lines.toJS();
	let maxViewIndex = lines.length && lines.reduce((sum, line)=>{ 
		return sum > line.views.length ? sum : line.views.length 
	}, 0);
  return { maxViewIndex: maxViewIndex, lines }
}

const LineNavigation = connect(
  mapStateToProps,
  actions
)(LineNavigationLogic)

export {LineNavigation}