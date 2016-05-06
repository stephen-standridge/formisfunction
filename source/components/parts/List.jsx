import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ListItem from './ListItem';
require('../../stylesheets/list.scss');

class List extends React.Component {
	render(){
		return (	
			<div className='list piece__list part'>
				<h3 className="strong"> {this.props.name} </h3>
				{this.renderItems()}
			</div> 
		)		
	}
	listItem(){
		return ListItem
	}
	renderItems(){
		if(!this.props.items){ return }
		return this.props.items.map(( item ) => React.createElement( this.listItem(), item) )
	}
}

List.shouldComponentUpdate = shouldPureComponentUpdate

export default List