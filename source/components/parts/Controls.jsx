import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class Controls extends React.Component {
	render(){
		return (	<div className='controls'>
			<h3 className="strong"> 'Controls' </h3>
			</div> )		
	}
}

Controls.shouldComponentUpdate = shouldPureComponentUpdate

export default Controls