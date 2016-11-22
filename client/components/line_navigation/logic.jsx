import {View} from '../view'
import {MainVideo} from '../main_video';
import '../../styles/line_navigation'


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
	routeSlug() {
		return this.props.routeParams ? this.props.routeParams.slug : false
	}
	renderLines() {
		// return this.props.lines.map(()=> <div className='line'></div> )
	}
	renderContent() {
		if(this.routeSlug()) return <View slug={this.routeSlug()} />
		return <MainVideo /> 
	}
	render(){
		return <div className='line__navigation'>
			{this.renderLines()}
			{this.renderContent()}
		</div>
	}	
}
export default LineNavigationLogic
