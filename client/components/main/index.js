import { connect } from 'react-redux'
import * as actions from '../../actions/component'
import MainLogic from './main'

const mapStateToProps = (state) => {
	const site = state.components.toJS();
	// const { lines, navigation } = site;
  // return { navigation, lines }
  return {}
}

const Main = connect( mapStateToProps, actions )(MainLogic)

export {Main}