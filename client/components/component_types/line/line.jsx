import { ComponentCreator } from '../../component';
import makeClassNames from 'classnames';
import './line.scss';

class LineComponent extends React.Component {
  renderNavigation() {
    const { component, setComponentState, slug, currentSlug, param } = this.props;
    return component && component.views && component.views.map((line, i) => {
      return <div key={i}
        className={`line__link josefin_regular regular ${currentSlug == line.slug ? 'active' : ''}`}
        onClick={function(){setComponentState(line.slug)}} />
    });
  }
  render(){
    const { slug, component, classNames, children, nextSlug, prevSlug, currentSlug, toNextState, toPrevState } = this.props;

    return <div className={`line__container ${classNames}`}>
      <div className="line__items">
      { component && component.views && component.views.map((c, index) => {
        let active = c.slug == currentSlug;
        let prev = c.slug == prevSlug;
        let next = c.slug == nextSlug;
        const classNames = makeClassNames("line__item", { active, next, prev });
        if (active || prev || next) {
          return <div key={index} className={classNames} >
            <ComponentCreator key={index} slug={c.slug} isActive={active} withHistory={false} isPrev={prev} isNext={next}>
            <div className='line__links med'>
              { this.renderNavigation() }
            </div>
            </ComponentCreator>
          </div>
        }
      }) }
      </div>
    </div>
  }
}
export { LineComponent }
