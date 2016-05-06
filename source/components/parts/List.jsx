import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class List extends React.Component {
	render(){
		return (	<div className='list'>
			<h3 className="strong"> {this.props.name} </h3>
			</div> )		
	}
}

List.shouldComponentUpdate = shouldPureComponentUpdate

export default List