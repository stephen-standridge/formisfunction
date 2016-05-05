import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class List extends React.Component {
	render(){
		return (	<div className='list'></div> )		
	}
}

List.shouldComponentUpdate = shouldPureComponentUpdate

export default List