import { ComponentCreator } from '../component';
import { ContactComponent } from './contact';
import { Link } from '../media';
import '../../styles/line_navigation';

class LineNavigationSiteComponent extends React.Component {
	renderLineNavigation(){
		const { component, componentState, setComponentState } = this.props;
		const { line_navigation } = component;
		return line_navigation && line_navigation.map((line, lineIndex)=>{
			const active = line.slug == componentState;
			return <div key={lineIndex}  className={`line__wrapper ${active ? 'active' : '' }`}>
				{ active ?
					<ComponentCreator slug={line.slug}/> :
					<div onClick={ ()=> setComponentState(line.slug) } > {line.slug} </div>
				}
				</div>
		});
	}
	shouldComponentUpdate({ componentState }, nextState) {
		return componentState !== this.props.componentState;
	}
	renderContact() {
		const { component } = this.props;
		const { contact } = component;
		return contact && contact.map((c, i)=> <ComponentCreator slug={c.slug} key={i}/>);
	}
	renderMeta() {
		const { component } = this.props;
		const { meta } = component;
		return meta && meta.map((m, i)=> <ComponentCreator slug={m.slug} key={i}/>);
	}
	render() {
		const { component, onPrev, onNext, classNames, slug, param } = this.props;
		return <div className={`component__container ${classNames}`}>
			<div className="line__navigation-contact">
					{this.renderContact()}
			</div>
			<div className='line__navigation'>
				<div className='navigation__wrapper'>
					{this.renderLineNavigation()}
				</div>
			</div>
			<div className="line__navigation-meta">
					{this.renderMeta()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
