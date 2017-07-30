import { connect } from 'react-redux';
import Remarkable from 'remarkable';

var md = new Remarkable({linkTarget: "_blank"});

class ArticleMedia extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	toggleActive(part){
		this.setState(({ active })=>{
			return Object.assign({ active }, { active: { [part]: !active[part] }})
		})
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `article__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	render(){
		const { article, classNames } = this.props;
		if (!article) return <div className={this.classNamesFor('not_found')} />
		const { title, body } = article;
		return <div className={`${this.classNamesFor('wrapper')}`}>
			{ title && <div className={`${this.classNamesFor('title')}`}
											onClick={this.toggleActive.bind(this, 'title')}>
				{ title }
			</div> }
			{ body && <div className={`${this.classNamesFor('body')}`}
											onClick={this.toggleActive.bind(this, 'body')}
											dangerouslySetInnerHTML={ { __html: md.render(body) } } >
			</div> }
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const article = state.media.getIn(['articles', ownProps.slug]);
	const [...version_ids] = article && article.get('article_versions').keys();
	const version = article && state.versions.getIn(['article_versions', version_ids[0]]);
	const toDisplay = article && version ? article.merge(version).toJS() : article.toJS();
  return { article: toDisplay };
}

const Article = connect(
	mapStateToProps
)(ArticleMedia)

export {Article}
