import * as media_component_types from '../../media';
import { capitalize } from 'lodash';
import './list_item.scss'

class ListItemComponent extends React.Component {
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

		return `list__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	render() {
		const { component, isActive } = this.props;
		const { slug } = component;

		// console.warn(component);
		return <div className={`list-item--${slug} ${this.classNamesFor('meta')}` }>
{/*			  { component.collections.map(function(collection, i) {
			  		console.warn(collection)
			  		if (collection === 'program') return null;
				  	let classNames = `list__collection--wrapper list__${collection}--wrapper ${this.classNamesFor(collection)}`;
				  	return collection && <div className={classNames} key={i} onClick={this.toggleActive.bind(this, collection)}>
				  		<div className={`${this.classNamesFor('collection')}`} >
					  		{ component[collection] && component[collection].map(function(m, i) {
					  			let MediaOfType = media_component_types[capitalize(m.type)];
					  			return <MediaOfType slug={m.slug} key={i} isActive={isActive} />
					  		})}
				  		</div>
				  	</div>
				  }.bind(this)) }*/}
		  </div>
	}
}

export { ListItemComponent }
