import { connect } from 'react-redux'
import LineNavigationLogic from './logic'
import * as actions from '../../actions/lines'

const mapStateToProps = (state) => {
  return { lines: state.lines.toJS() }
}

const LineNavigation = connect(
  mapStateToProps,
  actions
)(LineNavigationLogic)

export {LineNavigation}