import { connect } from 'react-redux'
import ReactPlayer from 'react-player';
import './video.scss';

class VideoMedia extends React.Component {
	render() {
		const { videoClip } = this.props;
		if (!videoClip) return <div className='video__loading' />

		return <ReactPlayer url={videoClip.url} />
	}
}

const mapStateToProps = (state, ownProps) => {
	let videoClip = state.media.getIn(['video_clips',ownProps.slug])
	videoClip = videoClip && videoClip.toJS()
  return { videoClip }
}

const VideoClip = connect(
	mapStateToProps
  // actions
)(VideoMedia)

export { VideoClip }
