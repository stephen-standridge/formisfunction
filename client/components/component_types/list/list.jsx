import { ComponentCreator } from '../../component';
import { MediaCreator } from '../../media';

import makeClassNames from 'classnames';
import './list.scss';

class ListComponent extends React.Component {
  render(){
    const { slug, component, classNames, children, nextSlug, prevSlug, currentSlug, setComponentState } = this.props;

    return <div className={`list__container ${classNames}`}>
      <div className="list__content">
        <div className="list__content--wrapper">
          { component && component.views && component.views.map((c, index) => {
            let active = c.slug == currentSlug;
            let prev = c.slug == prevSlug;
            let next = c.slug == nextSlug;
            const classNames = makeClassNames("list__entry", { active, next, prev });

              return <div key={index} className={classNames} onClick={function(){ if(active) return; setComponentState(c.slug);}}  >
                <ComponentCreator key={index} slug={c.slug} isActive={active} withHistory={false} isPrev={prev} isNext={next} />
              </div>
          }) }
        </div>
      </div>
      <div className="list__visuals"> 
        <MediaCreator slug={currentSlug} collection={"visuals"} active={true} />
      </div>
    </div>
  }
}
export { ListComponent }
