import { VideoClip } from '../media/video_clip';

class OneByNVideoComponent extends React.Component {
	renderMedia(){
		const { component } = this.props;
		const { media } = component;

		return media && media.map( (m, i) => <VideoClip key={i} id={m.id}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${ classNames }`}>
			<div className="component__center" >
				{component.component_type}
				{this.renderMedia()}
			</div>
    </div>
	}
}

export { OneByNVideoComponent }