import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

class ListItem extends React.Component{
	render(){
		if(this.props.to){
			return <div className="piece__list-item " ><Link to={this.props.to} className={this.props.className}>{this.props.text}</Link></div>
		}
		if(this.props.href){
			return <div className="piece__list-item" ><a href={this.props.href} className={this.props.className} >{this.props.text}</a></div>
		}
	}
}

ListItem.shouldComponentUpdate = shouldPureComponentUpdate

export default ListItem