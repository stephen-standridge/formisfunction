import { connect } from 'react-redux'
import Markdown from 'remarkable'

class ArticleMedia extends React.Component {
	render(){
		const { article } = this.props;
		return <div>
			<Markdown src={article} />
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
