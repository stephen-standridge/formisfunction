import * as media_types from '../media';
import '../../styles/contact.scss';

const Article = media_types.Article;
const Link = media_types.Link;

class ContactComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	toggleActive(collection){
		// this.setState(({ active })=>{
		// 	return Object.assign({ active }, { active: { [collection]: !active[collection] }})
		// })
	}
	render() {
		const { component, className, isActive } = this.props;
		const { slug } = component;
		const { active } = this.state;
		return <div className={`contact contact--${slug} ${className}` }>
				<div className={`contact__information contact__information--${slug}`}>
					{ component.information && component.information.map((info, i) => <Article slug={info.slug} key={i}/> )}
				</div>
				<div className={`contact__links contact__links--${slug}`}>
					{ component.links && component.links.map((l, i) => <Link slug={l.slug} key={i}/> )}
				</div>
		  </div>
	}
}

export { ContactComponent }
