import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class TextPiece extends React.Component {
	render(){
		return (	<div className='textPiece'></div> )		
	}
}

TextPiece.shouldComponentUpdate = shouldPureComponentUpdate

export default TextPiece