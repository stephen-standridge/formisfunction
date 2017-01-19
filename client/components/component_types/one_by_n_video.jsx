import { VideoClip } from '../media';

class OneByNVideoComponent extends React.Component {
	renderMedia(){
		const { component } = this.props;
		const { media } = component;

		return media && media.map( (m, i) => <VideoClip key={i} id={m.id}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		return <div className={`one_by_n_video__container ${ classNames }`}>
			<div className="one_by_n_video__center" >
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { OneByNVideoComponent }