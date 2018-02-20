import { ComponentCreator } from '../../component';
import { MediaCreator } from '../../media';

import makeClassNames from 'classnames';
import './list.scss';

class ListComponent extends React.Component {
  renderNavigation() {
    const { component, setComponentState, slug, currentSlug, param } = this.props;
    return component && component.views && component.views.map((list, i) => {
        return <div key={i}
          className={`list__link  ${currentSlug == list.slug ? 'active' : ''}`}
          onClick={function(){setComponentState(list.slug)}} />
      }) 
  }
  renderOneView() {
    const { slug, component, children, currentSlug } = this.props;
    const { options, views } = component;
    const view = views.filter((v) => v.slug == currentSlug)[0];
    const active = view.slug == currentSlug;
    const classNames = makeClassNames("list__entry", { active });
    console.warn(view);
    return <div className="list__content--wrapper">
      <div className={classNames}>
        <ComponentCreator slug={view.slug} isActive={active} withHistory={false} />
      </div>
    </div>    
  }  
  renderAllViews() {
    const { slug, component, children, nextSlug, prevSlug, currentSlug, setComponentState } = this.props;
    const { options, views } = component;

    return <div className="list__content--wrapper">
      { views && views.map((c, index) => {
        let active = c.slug == currentSlug;
        let prev = c.slug == prevSlug;
        let next = c.slug == nextSlug;
        const classNames = makeClassNames("list__entry", { active, next, prev });

          return <div key={index} className={classNames} onClick={function(){ if(active) return; setComponentState(c.slug);}}  >
            <ComponentCreator key={index} slug={c.slug} isActive={active} withHistory={false} isPrev={prev} isNext={next} />
          </div>
      }) }
    </div>    
  }
  render(){
    const { component, classNames, currentSlug } = this.props;
    const { options } = component;
    return <div className={`list__container ${classNames}`}>
      <div className="list__links">
      { options.side_navigation && this.renderNavigation() }
      </div>
      <div className="list__wrapper">
        <div className="list__wrapper--inner">
          <div className="list__content">
            { options.side_navigation && this.renderOneView() || this.renderAllViews() }
          </div>
          <MediaCreator slug={currentSlug} classNames="list__visuals" collection={"visuals"} active={true} />
        </div>
      </div>
    </div>
  }
}
export { ListComponent }
