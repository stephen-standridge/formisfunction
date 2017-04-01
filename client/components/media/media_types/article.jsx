import { connect } from 'react-redux';
import Remarkable from 'remarkable';

var md = new Remarkable({linkTarget: "_blank"});

class ArticleMedia extends React.Component {
	render(){
		const { article } = this.props;
		const { title, body } = article;
		return <div className="article__wrapper">
			{ title && <div className="article__title">
				{ title }
			</div> }
			{ body && <div className="article__body" dangerouslySetInnerHTML={ { __html: md.render(body) } } >
			</div> }
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const article = state.media.getIn(['articles', ownProps.slug]);
  return { article: article && article.toJS() }
}

const Article = connect(
	mapStateToProps
)(ArticleMedia)

export {Article}
