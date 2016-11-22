import { connect } from 'react-redux'
import NavigationLogic from './logic'
import * as actions from '../../actions/navigation'

const mapStateToProps = (state) => {
  return { navigation: state.navigation.toJS() }
}

const Navigation = connect(
  mapStateToProps,
  actions
)(NavigationLogic)

export {Navigation}