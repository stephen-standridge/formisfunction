import { ComponentCreator } from '../../component';
import makeClassNames from 'classnames';
import './line.scss';

class LineComponent extends React.Component {
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
            <ComponentCreator key={index} slug={c.slug} isActive={active} withHistory={false} isPrev={prev} isNext={next} />
          </div>
        }
      }) }
      </div>
      <div className="line__controls-wrapper">
        <div className="line__controls">
          { prevSlug ?
            <div className="line__controls--prev clickable" onClick={toPrevState} >{"<"}</div> :
            <div className="line__controls--prev"/> }
          { nextSlug ?
            <div className="line__controls--next clickable" onClick={toNextState} >{">"}</div> :
            <div className="line__controls--next"/> }
        </div>
        { children }
      </div>
    </div>
  }
}
export { LineComponent }
