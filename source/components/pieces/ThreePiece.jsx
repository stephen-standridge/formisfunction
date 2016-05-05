import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class ThreePiece extends React.Component {
	render(){
		return (	<div className='threePiece'></div> )		
	}
}

ThreePiece.shouldComponentUpdate = shouldPureComponentUpdate

export default ThreePiece