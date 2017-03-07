import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router'

class LinkMedia extends React.Component {
	render(){
		const {link} = this.props;
		return <RouterLink to={link.url}>{link.anchor}</RouterLink>
	}
}

const mapStateToProps = (state, ownProps) => {
	const link = state.media.getIn(['links', ownProps.slug]);
  return { link: link && link.toJS() }
}

const Link = connect(
	mapStateToProps
)(LinkMedia)

export {Link}
