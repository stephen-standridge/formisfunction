import {View} from '../view'
import {MainVideo} from '../main_video';
import {Link} from 'react-router'
import '../../styles/line_navigation'


class LineNavigation extends React.Component {
	routeSlug() {
		return this.props.routeParams ? this.props.routeParams.slug : false
	}
	renderLines(){
		console.warn(this.props)
		let { line_navigation, selectedLineIndex, selectedViewIndex } = this.props;
		if(!line_navigation.length) return
		return line_navigation.map((line, lineIndex)=>{
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
									onPrev={this.props.changeView.bind(this, -1)} 
									onNext={this.props.changeView.bind(this, 1)}/> :
								null
						})}
					</div> :
					null 
		});		
	}
	render(){
		console.warn(this.props)
		return <div className='line__navigation'>
			<div className='navigation__wrapper'>
				{this.renderLines()}
			</div>
		</div>
	}	
}
export { LineNavigation }
