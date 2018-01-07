import { ComponentCreator } from '../../component';
import { ContactComponent } from '../contact/contact.jsx';
import { Link } from '../../media';
import './line_navigation_site.scss';

class LineNavigationSiteComponent extends React.Component {
	getLineSlug(){
		const { component, currentSlug } = this.props;
		const { line_navigation } = component;
    const foundLine = line_navigation && line_navigation.filter(function(line, lineIndex){ return line.slug == currentSlug });
    const line = foundLine.length && foundLine[0];
    const slug = line && line.slug;
    return slug;
	}
	shouldComponentUpdate({ currentSlug }, nextState) {
		return currentSlug !== this.props.currentSlug;
	}
	renderContact() {
		const { component } = this.props;
		const { contact } = component;
		return contact && contact.map(function(c, i){
      return <ComponentCreator slug={c.slug} key={i}/>
    });
	}
	renderControls() {
		const { component, toPrevState, toNextState, currentSlug, nextSlug, prevSlug } = this.props;
    return <div className="line-navigation__controls">
      { prevSlug ?
        <div className="line-navigation__controls--prev clickable" onClick={toPrevState} >{"<"}</div> :
        <div className="line-navigation__controls--prev"/> }
      { nextSlug ?
        <div className="line-navigation__controls--next clickable" onClick={toNextState} >{">"}</div> :
        <div className="line-navigation__controls--next"/> }
    </div>
	}
	render() {
		const { component, onPrev, onNext, classNames, slug, param } = this.props;
		return <div className={`line-navigation__container ${classNames}`}>
			<div className='line-navigation'>
				<div className='line-navigation__wrapper'>
					{ this.getLineSlug() && <ComponentCreator slug={this.getLineSlug()} withHistory={true}>
            { this.renderControls() }
          </ComponentCreator> }
				</div>
			</div>
			<div className="line-navigation__contact">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
