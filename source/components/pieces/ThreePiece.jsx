import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class ThreePiece extends React.Component {
	render(){
		return (	<div className='threePiece piece'>
			<h1> Three</h1>
			</div> )		
	}
}

ThreePiece.shouldComponentUpdate = shouldPureComponentUpdate

export default ThreePiece