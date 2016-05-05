import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class TextPiece extends React.Component {
	render(){
		return (	<div className='textPiece'>
				<h1> 'Text' </h1>
				<p>{this.props.body}</p>
			</div> )		
	}
}

TextPiece.shouldComponentUpdate = shouldPureComponentUpdate

export default TextPiece