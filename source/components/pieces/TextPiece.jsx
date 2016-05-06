import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Remarkable from 'remarkable'
const MD = new Remarkable();

class TextPiece extends React.Component {
	render(){
		return (	<div className='textPiece piece' dangerouslySetInnerHTML={ {__html: this.renderMarkdown() } }>
			</div> )		
	}
	renderMarkdown(){
		return MD.render(this.props.body)
	}
}

TextPiece.shouldComponentUpdate = shouldPureComponentUpdate

export default TextPiece