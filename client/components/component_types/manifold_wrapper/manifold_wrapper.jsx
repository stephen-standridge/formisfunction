import { Manifold } from '../../media';
import { PieceMetaComponent } from '../piece_meta/piece_meta.jsx';
import './manifold_wrapper.scss';


class ManifoldWrapperComponent extends React.Component {
	renderMedia(){
		const { component, isActive } = this.props;
		const { media } = component;
		return media && media.map( (m, i) => m.type == "program" && <Manifold key={i} slug={m.slug} isActive={isActive}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames, isActive, children } = this.props;
		const { slug } = component;
		return <div className={`piece__container piece__container--${slug} ${ classNames }`}>
			<PieceMetaComponent component={component} >
			{children}			
			</PieceMetaComponent>

			<div className={`piece__wrapper piece__wrapper--${slug}`} >
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { ManifoldWrapperComponent }
