import { connect } from 'react-redux'
import ViewLogic from './logic'

const mapStateToProps = (state) => {
  return {}
}

const View = connect( mapStateToProps,
  { test: function(){} }
)(ViewLogic)

export default View