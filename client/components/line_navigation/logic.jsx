import {View} from '../view'
import CSS from '../../styles/path_navigation'

class LineNavigationLogic extends React.Component {
	constructor(){
		super()
		this.componentWillMount = this.fetchLines;
	}
	fetchLines(){
		this.props.fetch()
		//if slug, get slug or 404
		//if no slug, get index
	}
	renderLines(){
		// return this.props.lines.map(()=> <div className='line'></div> )
	}
	render(){
		return <div className='line__navigation'>
			{this.renderLines()}
			<View />
		</div>
	}	
}
export default LineNavigationLogic
