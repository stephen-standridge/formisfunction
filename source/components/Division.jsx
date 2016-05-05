import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PARTS from '../constants/parts';
import {map} from 'underscore';

class Division extends React.Component {
	render(){
		return (
			<div className={`${this.props.section}__${this.props.division} piece__${this.props.division}`}>
				{this.renderParts()}
			</div>
		)	
	}
	renderParts(){
		if(!this.props.contents){ return }
			return map(this.props.contents, function( item, index ){
				return React.createElement( PARTS[item.type], Object.assign({key: index, section: this.props.section}, item) )
			}, this)
	}
}

Division.shouldComponentUpdate = shouldPureComponentUpdate

export default Division