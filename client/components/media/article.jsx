import { connect } from 'react-redux'
import Markdown from 'remarkable'

class ArticleComponent extends React.Component {
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
)(ArticleComponent)

export {Article}
