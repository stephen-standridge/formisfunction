import * as media_types from '../media';
import '../../styles/pieces.scss';

const Manifold = media_types.Manifold;

class PieceMetaComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	toggleActive(collection){
		this.setState(({ active })=>{
			return Object.assign({ active }, { active: { [collection]: !active[collection] }})
		})
	}
	render() {
		const { component, className, isActive } = this.props;
		const { slug } = component;
		const { active } = this.state;
		return <div className={`piece__meta piece__meta--${slug} ${className}` }>
			  { component.collections.map((collection, i)=> {
			  	let classNames = `piece__collection--wrapper piece__${collection}--wrapper clickable ${active[collection] ? 'active' : ''}`;
			  	return collection && <div className={classNames} key={i} onClick={this.toggleActive.bind(this, collection)}>
			  		<div className={`piece__${collection} piece__collection`} >
				  		{ component[collection] && component[collection].map((m, i)=>{
				  			let MediaOfType = media_types[m.type];
				  			return <MediaOfType slug={m.slug} key={i} isActive={isActive} />
				  		})}
			  		</div>
			  	</div>
			  }) }
		  </div>
	}
}

export { PieceMetaComponent }
