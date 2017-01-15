import { connect } from 'react-redux'
import { LineNavigationComponent } from './line_navigation'
import * as actions from '../../actions/line_navigation'


const mapStateToProps = (state) => {
  return {}
}

const LineNavigation = connect(
  mapStateToProps,
  actions
)(LineNavigationComponent)

export { LineNavigation }