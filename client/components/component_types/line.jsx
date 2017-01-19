import { Component } from '../component';

class LineComponent extends React.Component {
	render(){
		const { slug, component, componentState, classNames } = this.props;
		return <div className={`line__container ${classNames}`}>
			{ component && component.views.map((c, index) => {
				const active = c.slug == componentState;
				return active ? <Component key={index} slug={c.slug} /> : <div key={index} className="view__wrapper" />
			}) }
		</div>
	}	
}
export { LineComponent }
