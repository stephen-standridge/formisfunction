import { connect } from 'react-redux'
import ViewLogic from './logic'
import * as actions from '../../actions/view'

const mapStateToProps = (state) => {
  return {}
}

const View = connect( 
	mapStateToProps,
  actions
)(ViewLogic)

export {View}