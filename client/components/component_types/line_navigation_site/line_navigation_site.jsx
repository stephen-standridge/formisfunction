import { ComponentCreator } from '../../component';
import { ContactComponent } from '../contact/contact.jsx';
import { Link } from '../../media';
import './line_navigation_site.scss';

class LineNavigationSiteComponent extends React.Component {
	getLineSlug(){
		const { component, componentState, setComponentState } = this.props;
		const { line_navigation } = component;
    const foundLine = line_navigation && line_navigation.filter(function(line, lineIndex){ return line.slug == componentState });
    const line = foundLine.length && foundLine[0];
    const slug = line && line.slug || "not_found";
    return slug;
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
		return <div className={`line-navigation__container ${classNames}`}>
			<div className='line-navigation'>
				<div className='line-navigation__wrapper'>
					<ComponentCreator slug={this.getLineSlug()} withHistory={true}>
            { this.renderControls() }
          </ComponentCreator>
				</div>
			</div>
			<div className="line-navigation__contact">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
