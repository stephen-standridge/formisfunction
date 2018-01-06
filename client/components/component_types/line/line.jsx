import { ComponentCreator } from '../../component';
import makeClassNames from 'classnames';
import './line.scss';

class LineComponent extends React.Component {
  render(){
    const { slug, component, componentState, classNames, setComponentState } = this.props;
    const selectedIndex = component.states.findIndex(function(c){ return c == componentState }) || 0;
    const prevIndex = (selectedIndex - 1);
    const prevState = prevIndex >= 0 ? component.states[prevIndex] : component.states[component.states.length - 1];

    const nextIndex = (selectedIndex + 1);
    const nextState = nextIndex <= component.states.length - 1 ? component.states[nextIndex] : component.states[0];

    return <div className={`line__container ${classNames}`}>
      <div className="line__items">
      { component && component.views.map((c, index) => {
        let active = c.slug == componentState;
        let prev = c.slug == prevState;
        let next = c.slug == nextState;
        const classNames = makeClassNames("line__item", { active, next, prev })
        if (active || prev || next) {
          return <div key={index} className={classNames} >
            <ComponentCreator key={index} slug={c.slug} isActive={active} isPrev={prev} isNext={next} />
            <div className="line__controls">
              { prevState ?
                <div className="line__controls--prev clickable" onClick={setComponentState.bind(this, prevState)} >{"<"}</div> :
                <div className="line__controls--prev"/> }
              { nextState ?
                <div className="line__controls--next clickable" onClick={setComponentState.bind(this, nextState)} >{">"}</div> :
                <div className="line__controls--next"/> }
            </div>
          </div>
        }
      }) }
      </div>
    </div>
  }
}
export { LineComponent }
