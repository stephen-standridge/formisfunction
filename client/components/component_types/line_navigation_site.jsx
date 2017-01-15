import { Component } from '../component';
import { Link } from '../media';

class LineNavigationSiteComponent extends React.Component {
	renderLineNavigation(){
		const { component } = this.props;
		const { line_navigation } = component;
		return line_navigation && line_navigation.map((line, lineIndex)=>{
			// let shouldRenderLineViewNavigation = selectedLineIndex === false;
			// let shouldRenderBack = selectedLineIndex === lineIndex - 1 || selectedLineIndex === lineIndex +1;
			// let shouldRenderView = !shouldRenderLineViewNavigation;

			// let className = selectedLineIndex === lineIndex ? 'active' : selectedLineIndex !== false ? 'inactive' : ''		
			return <Component key={lineIndex} slug={line.slug} />
		});		
	}
	renderNavigation() {	
		const { component } = this.props;
		const { navigation } = component;
		return navigation && navigation.map((link, index) => <Link key={index} slug={link.slug} /> )		
	}
	render() {
		const { component, onPrev, onNext, classNames, slug, param } = this.props;
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${classNames}`}>
			<div className='line__navigation'>
				<div className='navigation__wrapper'>	
					{this.renderLineNavigation()}
				</div>
			</div>
			<div className="main__navigation">
				<div className='navigation__links' >
					{this.renderNavigation()}				
				</div>
			</div>			
    </div>
	}
}

export { LineNavigationSiteComponent }