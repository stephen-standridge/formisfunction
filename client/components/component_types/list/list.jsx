import { ComponentCreator } from '../../component';
import { MediaCreator } from '../../media';
import { throttle } from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import makeClassNames from 'classnames';
import './list.scss';

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = throttle(this._handleScroll.bind(this), 700);
  }
  
  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  };
  
  _handleScroll(event) {
    const { movementY } = event;
    console.warn(event);
    if (Math.abs(movementY) < 1) return;
    const { toNextState, toPrevState } = this.props;
    if (movementY > 0) toNextState();
    else toPrevState();
  }


  renderNavigation() {
    const { component, setComponentState, currentSlug } = this.props;
    return component && component.views && component.views.map((list, i) => {
        return <div key={i}
          className={`list__link  ${currentSlug == list.slug ? 'active' : ''}`}
          onClick={function(){setComponentState(list.slug)}} />
      }) 
  }

  renderOneView() {
    const { component, currentSlug } = this.props;
    const { views } = component;
    const view = views.filter((v) => v.slug == currentSlug)[0];
    const active = view.slug == currentSlug;
    const classNames = makeClassNames("list__entry", { active });
    return <CSSTransition key={currentSlug} timeout={100} className="transition__node list__content--wrapper">
      <div className={classNames}>
        <ComponentCreator slug={view.slug} isActive={active} withHistory={false} />
      </div>
    </CSSTransition>;
  }  
  renderAllViews() {
    const { component, nextSlug, prevSlug, currentSlug, setComponentState } = this.props;
    const { views } = component;

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
    if (component.loading !== false) return <div className="list__container component__loading" />
    return <div className={`list__container ${classNames} list__${component.slug}`}>
      <div className="list__wrapper">
        <div className="list__wrapper--inner">
          <div className="list__content">
            <div className="list__links">
              { options.side_navigation && this.renderNavigation() }
            </div>
            <TransitionGroup className="transition__wrapper" exit={true}>
            { options.side_navigation && 
              this.renderOneView()|| 
              this.renderAllViews() 
            }
            </TransitionGroup>
          </div>
          <MediaCreator slug={currentSlug} classNames="list__visuals" collection={"visuals"} active={true} />
        </div>
      </div>
    </div>
  }
}
export { ListComponent }
