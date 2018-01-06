import { ComponentCreator } from '../../component';
import { ContactComponent } from '../contact/contact.jsx';
import { Link } from '../../media';
import { LineControls } from './line_controls.jsx';
import './line_navigation_site.scss';

class LineNavigationSiteComponent extends React.Component {
	renderLineNavigation(){
		const { component, componentState, setComponentState } = this.props;
		const { line_navigation } = component;
		return line_navigation && line_navigation.map(function(line, lineIndex){
			const active = line.slug == componentState;
			return <div key={lineIndex}  className={`line-navigation__line ${active ? 'active' : '' }`}>
				{ active ? <ComponentCreator slug={line.slug}> </ComponentCreator> : <div /> }
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
	render() {
		const { component, onPrev, onNext, classNames, slug, param, componentState, setComponentState } = this.props;

    const selectedIndex = component.states.findIndex(function(c){ return c == componentState }) || 0;
    const prevIndex = (selectedIndex - 1);
    const prevState = prevIndex >= 0 ? component.states[prevIndex] : component.states[component.states.length - 1];

    const nextIndex = (selectedIndex + 1);
    const nextState = nextIndex <= component.states.length - 1 ? component.states[nextIndex] : component.states[0];

		return <div className={`component__container ${classNames}`}>
      <div className='line-navigation__wrapper'>
        {this.renderLineNavigation()}
      </div>
			<div className="line-navigation__controls">
				<LineControls prevClick={setComponentState.bind(this, prevState)} prevState nextState nextClick={setComponentState.bind(this, nextState)} />
			</div>
			<div className="line-navigation__contact">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
