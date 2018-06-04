import { connect } from 'react-redux';
import Remarkable from 'remarkable';
import './article.scss'

var md = new Remarkable({linkTarget: "_blank"});

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
			{ body && <div className={`josefin_light regular med ${this.classNamesFor('body')}`}
											onClick={this.toggleActive.bind(this, 'body')}
											dangerouslySetInnerHTML={ { __html: md.render(body) } } >
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
