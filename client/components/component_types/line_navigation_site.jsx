import { Component } from '../component';
import { Link } from '../media';
import '../../styles/line_navigation';

class LineNavigationSiteComponent extends React.Component {
	renderLineNavigation(){
		const { component, componentState, setComponentState } = this.props;
		const { line_navigation } = component;
		return line_navigation && line_navigation.map((line, lineIndex)=>{
			const active = line.slug == componentState ;
			return <div key={lineIndex}  className={`line ${active ? 'active' : '' }`}>
				{ active ? 
					<Component slug={line.slug}/> :
					<div onClick={ ()=> setComponentState(line.slug) } > {line.slug} </div>
				}
				</div>
		});		
	}
	shouldComponentUpdate({ componentState }, nextState) {
		return componentState !== this.props.componentState;
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