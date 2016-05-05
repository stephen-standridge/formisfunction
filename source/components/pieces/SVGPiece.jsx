import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class SVGPiece extends React.Component {
	render(){
		return (	<div className='svgPiece'></div> )		
	}
}

SVGPiece.shouldComponentUpdate = shouldPureComponentUpdate

export default SVGPiece