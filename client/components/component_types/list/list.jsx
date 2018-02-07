import { ComponentCreator } from '../../component';
import makeClassNames from 'classnames';
import './list.scss';

class ListComponent extends React.Component {
  renderNavigation() {
    const { component, setComponentState, slug, currentSlug, param } = this.props;
    return component && component.views && component.views.map((list, i) => {
      return <div key={i}
        className={`list__link josefin_regular regular ${currentSlug == list.slug ? 'active' : ''}`}
        onClick={function(){setComponentState(list.slug)}} />
    });
  }
  render(){
    const { slug, component, classNames, children, nextSlug, prevSlug, currentSlug, toNextState, toPrevState } = this.props;

    return <div className={`list__container ${classNames}`}>
      <div className="list__items">
      { component && component.views && component.views.map((c, index) => {
        let active = c.slug == currentSlug;
        let prev = c.slug == prevSlug;
        let next = c.slug == nextSlug;
        const classNames = makeClassNames("list__item", { active, next, prev });
        if (active || prev || next) {
          return <div key={index} className={classNames} >
            <ComponentCreator key={index} slug={c.slug} isActive={active} withHistory={false} isPrev={prev} isNext={next} />
          </div>
        }
      }) }
      </div>
      <div className='list__links med'>
        { this.renderNavigation() }
      </div>
    </div>
  }
}
export { ListComponent }
