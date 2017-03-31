import { Manifold } from '../media';

class ManifoldWrapperComponent extends React.Component {
	renderMedia(){
		const { component } = this.props;
		const { media } = component;

		return media && media.map( (m, i) => <Manifold key={i} id={m.id}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		const { slug } = component;
		return <div className={`piece__container piece__container--${slug} ${ classNames }`}>
			<div className="piece__wrapper piece__wrapper--${slug}" >
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { ManifoldWrapperComponent }
