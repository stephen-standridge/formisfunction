import { connect } from 'react-redux';
import Remarkable from 'remarkable';
import './article.scss'

var md = new Remarkable({linkTarget: "_blank"});
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
class ArticleMedia extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	toggleActive(part){
		this.setState(function({ active }) {
			return Object.assign({ active }, { active: { [part]: !active[part] }})
		})
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `article__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	render(){
		const { article, classNames, children } = this.props;
		if (!article) return <div className={this.classNamesFor('not_found')} ></div>
		if (article.loading) return <div className={this.classNamesFor('loading')} ></div>
		if (article.error) return <div className={this.classNamesFor('error')} >{article.error}</div>

		const { title, body } = article;
		return <div className={`${this.classNamesFor('wrapper')}`}>
			{ title && <div className={`lato large wide dark dark_color ${this.classNamesFor('title')}`}>
				{ title }
			</div> }
			{ <div className={`josefin_light regular med ${this.classNamesFor('body')} ${body ? '' : 'invisible'}`}
											onClick={this.toggleActive.bind(this, 'body')}
											dangerouslySetInnerHTML={ { __html: md.render(body || lorem)} } >
			</div> }
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const article = state.media.getIn(['articles', ownProps.slug]);
  return { article: article && article.toJS() };
}

const Article = connect(
	mapStateToProps
)(ArticleMedia)

export {Article}
