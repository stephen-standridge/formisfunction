import { connect } from 'react-redux'
import ReactPlayer from 'react-player';

class VideoClipMedia extends React.Component {
	render() {
		const { videoClip } = this.props;
		if (!videoClip) return <div className='video__loading' />

		return <ReactPlayer url={videoClip.url} />
	}
}

const mapStateToProps = (state, ownProps) => {
	let videoClip = state.media.getIn(['video_clips',ownProps.id])
	videoClip = videoClip && videoClip.toJS()
  return { videoClip }
}

const VideoClip = connect(
	mapStateToProps
  // actions
)(VideoClipMedia)

export { VideoClip }
