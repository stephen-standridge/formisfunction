import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class TextPiece extends React.Component {
	render(){
		return (	<div className='textPiece piece'>
				<h1> text </h1>
				<p>{this.props.body}</p>
			</div> )		
	}
}

TextPiece.shouldComponentUpdate = shouldPureComponentUpdate

export default TextPiece