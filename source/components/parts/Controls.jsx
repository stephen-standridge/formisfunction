import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class Controls extends React.Component {
	render(){
		return (	<div className='controls'></div> )		
	}
}

Controls.shouldComponentUpdate = shouldPureComponentUpdate

export default Controls