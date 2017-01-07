import { connect } from 'react-redux'
import ComponentLogic from './logic'
// import * as actions from '../../actions/component'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const Component = connect( 
	mapStateToProps
  // actions
)(ComponentLogic)

export {Component}