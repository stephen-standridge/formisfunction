import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DIVISIONS from '../constants/divisions';
import Division from './Division';
import {map} from 'underscore';

class PieceDisplay extends React.Component {
	render(){		
 		return (	<div className='sections__wrapper'>		
			<div className='sections__wrapper-piece'>
				{ this.renderDivisions() }
			</div>
		</div> )
	}
	renderDivisions(){
		if(!this.props.displayedPiece){ return }
		return map(DIVISIONS, function( divisionName ){
			return <Division key={divisionName} division={divisionName} contents={this.props.displayedPiece[divisionName]} piece={this.props.displayedPiece} section={this.props.currentSection} />
		}, this)
	}
}
PieceDisplay.shouldComponentUpdate = shouldPureComponentUpdate

export default PieceDisplay;