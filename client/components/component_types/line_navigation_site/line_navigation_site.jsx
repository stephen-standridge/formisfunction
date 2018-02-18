import { ComponentCreator } from '../../component';
import { ContactComponent } from '../contact/contact.jsx';
import { Link } from '../../media';
import { orderBy, capitalize } from 'lodash';
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
	// shouldComponentUpdate({ currentSlug }, nextState) {
	// 	return currentSlug !== this.props.currentSlug;
	// }
  renderLineNavigation() {
    const { component, setComponentState, slug, currentSlug, param } = this.props;
    return component && component.line_navigation && component.line_navigation.map((line, i) => {
      return <div key={i}className={`line-navigation__link josefin_regular regular ${currentSlug == line.slug ? 'active' : ''}`} onClick={function(){setComponentState(line.slug)}} >
        {line.slug}
      </div>
    });
  }
	renderContact() {
		const { component } = this.props;
		const { contact } = component;
		return contact && contact.map(function(c, i){
      return <ComponentCreator slug={c.slug} key={i}/>
    });
	}
	render() {
    const { component, classNames, params } = this.props;
    const { options } = component;
    const { title } = options;
		return <div className={`line-navigation__container ${classNames} ${ params && params.join(' ') || ''}`}>
      <div className='line-navigation__header '>
        <div className='line-navigation__title lato large wide dark dark_color header'>
          { typeof title == 'string' && title.split(' ').map(function(t){ return capitalize(t)}).join(' ') || null }
        </div>
        <div className='line-navigation__links med'>
          { this.renderLineNavigation() }
        </div>
      </div>
			<div className='line-navigation__wrapper'>
				{ this.getLineSlug() && <ComponentCreator slug={this.getLineSlug()} withHistory={true}></ComponentCreator> }
			</div>
			<div className="line-navigation__contact med">
					{this.renderContact()}
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }
