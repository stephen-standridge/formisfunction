import {View} from '../view'
import {MainVideo} from '../main_video';
import {Line} from './line.jsx'
import {Link} from 'react-router'
import '../../styles/line_navigation'


class LineNavigationLogic extends React.Component {
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
					<div key={lineIndex} className={`line back`}>
						{line.views.map((view, viewIndex)=>{
							return selectedViewIndex === viewIndex ? 
								<Link key={`${lineIndex}.${viewIndex}`} className='line__link' to={view.slug} >{view.title}</Link> :
								null
						})}
					</div> :			
				shouldRenderView ?
					<div key={lineIndex} className={`line ${className}`}>
						{line.views.map((view, viewIndex)=>{
							let isView = this.routeSlug() == view.slug;
							let isFirst = this.routeSlug() == undefined && viewIndex == 0;
							return isFirst || isView  ? 
								<View {...view} 
									key={`${lineIndex}.${viewIndex}`}			
									id={ view.id }					
									onPrev={this.props.changeView.bind(this, -1)} 
									onNext={this.props.changeView.bind(this, 1)}/> :
								null
						})}
					</div> :
					null 
		});		
	}
	render(){
		return <div className='line__navigation'>
			<div className='navigation__wrapper'>
				{this.renderLines()}
			</div>
			{this.routeSlug() ? this.renderVideo() : null}
		</div>
	}	
}
export default LineNavigationLogic
