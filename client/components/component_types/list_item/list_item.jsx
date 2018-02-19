import * as media_component_types from '../../media';
import { ComponentCreator } from '../../component/index';
import { capitalize } from 'lodash';
import './list_item.scss'

class ListItemComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `list__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	renderContent() {
		const { component, isActive } = this.props;
		const { content } = component;
		let classNames = `list__collection--wrapper list__content--wrapper`;
		return content && <div className={classNames}>
			<div className={`${this.classNamesFor('collection')}`} >
				{ content && content.map(function(m, i) {
					let MediaOfType = media_component_types[capitalize(m.type)];
					return <MediaOfType slug={m.slug} key={i} isActive={isActive} />
				})}
			</div>
		</div>
	}
	render() {
		const { component, isActive } = this.props;
		const { slug } = component;

		return <div className={`list-item--${slug} ${this.classNamesFor('meta')}` }>
			{this.renderContent()}
		  </div>
	}
}

export { ListItemComponent }
