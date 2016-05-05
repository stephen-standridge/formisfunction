import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class TreeNavigation extends React.Component {
	render(){
		return (	<div className='treeNavigation'>
			<strong> 'File Navigation' </strong>
			</div> )		
	}
}

TreeNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default TreeNavigation