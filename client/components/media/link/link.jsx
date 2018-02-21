import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router'
import CopyToClipboard from 'react-copy-to-clipboard';
import * as link_images from './link_images';
import './link.scss';

class LinkMedia extends React.Component {
	constructor(props){
		super(props);
		this.state={};
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `link__${part} ${(classNames && classNames[part]) || ''}}`
	}
	render(){
		const { link } = this.props;
		if (!link) return <div className={this.classNamesFor('not_found')} />
		const { url, anchor } = link;
		const ImageOfType = link_images[anchor];

		if (ImageOfType) {
			return <a className="link__media link__media--image" href={link.url} target="_blank">
				<ImageOfType></ImageOfType>
			</a>
		}

		const { copied } = this.state;
		const isEmail = validateEmail(url);
		const copiedClass = copied == false ? 'copied_again' : copied == true ? 'copied' : '';

		if (isEmail) {
			return <CopyToClipboard text={url} onCopy={() => this.setState({copied: !this.state.copied})}>
				<span className={`link__media link__media--image ${copiedClass}`} >
					<ImageOfType></ImageOfType>
				</span>
			</CopyToClipboard>
		}

		return <a className="link__media" href={link.url} target="_blank"><span>{link.anchor}</span></a>;
	}
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const mapStateToProps = (state, ownProps) => {
	const link = state.media.getIn(['links', ownProps.slug]);
	return { link: link && link.toJS() }
}

const Link = connect(
	mapStateToProps
)(LinkMedia)

export {Link}
