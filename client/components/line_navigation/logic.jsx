import {View} from '../view'
import {MainVideo} from '../main_video';
import {Line} from './line.jsx'
import {Link} from 'react-router'
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
	renderVideo() {
		if(this.routeSlug()) return 
		return <MainVideo /> 
	}
	renderLines(){
		let { lines, selectedLineIndex, selectedViewIndex } = this.props;
		if(!lines.length) return
		return lines.map((line, lineIndex)=>{
			let shouldRenderLineViewNavigation = selectedLineIndex === false;
			let shouldRenderBack = selectedLineIndex === lineIndex - 1 || selectedLineIndex === lineIndex +1;
			let shouldRenderView = !shouldRenderLineViewNavigation;

			let className = selectedLineIndex === lineIndex ? 'active' : selectedLineIndex !== false ? 'inactive' : ''			
			return shouldRenderLineViewNavigation ?
					<div key={lineIndex} className={`line ${className}`}>
						{line.views.map((view, viewIndex)=>{
							return selectedViewIndex === viewIndex ? 
								<Link key={`${lineIndex}.${viewIndex}`} className='line__link' to={view.slug} >{view.title}</Link> :
								null
						})}
					</div> : 
				shouldRenderBack ? 
					<div key={lineIndex} className='line back'>
						<Link key={lineIndex} className='line__link' to={'/'} >{'Back'}</Link> :				
					</div> :			
				shouldRenderView ?
					<div key={lineIndex} className={`line ${className}`}>
						{line.views.map((view, viewIndex)=>{
							return this.routeSlug() == view.slug  ? 
								<View key={`${lineIndex}.${viewIndex}`} {...view} /> :
								null
						})}
					</div> :
					null 
		});		
	}
	render(){
		return <div className='line__navigation'>
			<div className='navigation__wrapper'>
				<div className='line__navigation--left' onClick={this.props.changeView.bind(this, -1)}>{'<'}</div>
				<div className='line__navigation--center'>
					{this.renderLines()}
				</div>
				<div className='line__navigation--right' onClick={this.props.changeView.bind(this, 1)}>{'>'}</div>				
			</div>
			{this.routeSlug() ? this.renderVideo() : null}
		</div>
	}	
}
export default LineNavigationLogic
