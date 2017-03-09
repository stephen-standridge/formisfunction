import { Manifold } from '../media';

class ManifoldWrapperComponent extends React.Component {
	renderMedia(){
		const { component } = this.props;
		const { media } = component;

		return media && media.map( (m, i) => <Manifold key={i} id={m.id}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		return <div className={`manifold_wrapper__container ${ classNames }`}>
			<div className="manifold_wrapper__center" >
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { ManifoldWrapperComponent }
