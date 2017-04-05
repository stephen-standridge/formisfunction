import * as media_types from '../media';
import '../../styles/pieces.scss';

const Manifold = media_types.Manifold;

class PieceMetaComponent extends React.Component {
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

		return `piece__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	render() {
		const { component, isActive } = this.props;
		const { slug } = component;

		return <div className={`piece__meta--${slug} ${this.classNamesFor('meta')}` }>
			  { component.collections.map((collection, i)=> {
			  	let classNames = `piece__collection--wrapper piece__${collection}--wrapper clickable ${this.classNamesFor(collection)}`;
			  	return collection && <div className={classNames} key={i} onClick={this.toggleActive.bind(this, collection)}>
			  		<div className={`${this.classNamesFor('collection')}`} >
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
