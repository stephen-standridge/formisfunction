import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class TreeNavigation extends React.Component {
	render(){
		return (	<div className='treeNavigation'>
			<h3 className="strong"> file navigation </h3>
			</div> )		
	}
}

TreeNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default TreeNavigation