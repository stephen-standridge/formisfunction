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
	render() {
		const { component, toPrevState, toNextState, classNames, slug, param, nextSlug, prevSlug } = this.props;
		return <div className={`line-navigation__container ${classNames}`}>
			<div className='line-navigation'>
        { prevSlug ?
          <div className="line-navigation__controls--prev button" onClick={toPrevState} >{"<"}</div> :
          <div className="line-navigation__controls--prev"/> }
				<div className='line-navigation__wrapper'>
					{ this.getLineSlug() && <ComponentCreator slug={this.getLineSlug()} withHistory={true}></ComponentCreator> }
				</div>
        { nextSlug ?
          <div className="line-navigation__controls--next button" onClick={toNextState} >{">"}</div> :
          <div className="line-navigation__controls--next"/> }
			</div>
			<div className="line-navigation__contact">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
