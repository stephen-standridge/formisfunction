import ReactPlayer from 'react-player';

class VideoLogic extends React.Component {
	render() {
		const { videoClip } = this.props;
		if (!videoClip) return <div className='video__loading' />

		return <ReactPlayer url={videoClip.url} />
	}
}

export default VideoLogic