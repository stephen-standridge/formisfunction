import { Emscripten } from '../media';

class EmscriptenWrapperComponent extends React.Component {
	renderMedia(){
		const { component } = this.props;
		const { media } = component;

		return media && media.map( (m, i) => <Emscripten key={i} id={m.id}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		return <div className={`emscripten_wrapper__container ${ classNames }`}>
			<div className="emscripten_wrapper__center" >
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { EmscriptenWrapperComponent }
