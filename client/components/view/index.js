import { connect } from 'react-redux'
import ViewLogic from './logic'
import { get } from '../../actions/view'

const mapStateToProps = (state) => {
  return {}
}

const View = connect( 
	mapStateToProps,
  { get }
)(ViewLogic)

export default View