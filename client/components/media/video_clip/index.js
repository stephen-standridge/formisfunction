import { connect } from 'react-redux'
import VideoLogic from './logic';

const mapStateToProps = (state, ownProps) => {
	console.warn(ownProps.id)
	let videoClip = state.media.getIn(['video_clips',ownProps.id])
	videoClip = videoClip && videoClip.toJS()
  return { videoClip }
}

const VideoClip = connect( 
	mapStateToProps
  // actions
)(VideoLogic)

export {VideoClip}