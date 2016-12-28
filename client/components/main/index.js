import { connect } from 'react-redux'
import * as actions from '../../actions/site'
import MainLogic from './main'

const mapStateToProps = (state) => {
	const site = state.site.toJS();
	const { lines, navigation } = site;
  return { navigation, lines }
}

const Main = connect( mapStateToProps, actions )(MainLogic)

export {Main}