import { ComponentCreator } from '../../component';
import { ContactComponent } from '../contact/contact.jsx';
import { Link } from '../../media';
import './line_navigation_site.scss';

class LineNavigationSiteComponent extends React.Component {
	renderLineNavigation(){
		const { component, componentState, setComponentState } = this.props;
		const { line_navigation } = component;
		return line_navigation && line_navigation.map(function(line, lineIndex){
			const active = line.slug == componentState;
			return <div key={lineIndex}  className={`line-navigation__line ${active ? 'active' : '' }`}>
				{ active ? <ComponentCreator slug={line.slug}/> : <div /> }
				</div>
		});
	}
	shouldComponentUpdate({ componentState }, nextState) {
		return componentState !== this.props.componentState;
	}
	renderContact() {
		const { component } = this.props;
		const { contact } = component;
		return contact && contact.map(function(c, i){ return <ComponentCreator slug={c.slug} key={i}/> });
	}
	renderControls() {
		const { component, componentState, setComponentState } = this.props;
		const selectedIndex = component.states.findIndex(function(c){ return c == componentState }) || 0;
    const prevIndex = (selectedIndex - 1);
    const prevState = prevIndex >= 0 ? component.states[prevIndex] : component.states[component.states.length - 1];

    const nextIndex = (selectedIndex + 1);
    const nextState = nextIndex <= component.states.length - 1 ? component.states[nextIndex] : component.states[0];

    return <div className="line-navigation__controls">
      { prevState ?
        <div className="line-navigation__controls--prev clickable" onClick={setComponentState.bind(this, prevState)} >{"<"}</div> :
        <div className="line-navigation__controls--prev"/> }
      { nextState ?
        <div className="line-navigation__controls--next clickable" onClick={setComponentState.bind(this, nextState)} >{">"}</div> :
        <div className="line-navigation__controls--next"/> }
    </div>
	}
	render() {
		const { component, onPrev, onNext, classNames, slug, param } = this.props;
		return <div className={`component__container ${classNames}`}>
			<div className='line-navigation'>
				<div className='line-navigation__wrapper'>
					{this.renderLineNavigation()}
				</div>
			</div>
			<div className="line-navigation__controls">
					{this.renderControls()}
			</div>
			<div className="line-navigation__contact">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
