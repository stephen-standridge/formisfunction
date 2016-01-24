import Tree from 'basic-tree';
import Path from './Path.js';
import InitialLinework from '../constants/linework.js';
import {Observable} from 'rx';
import {Map} from 'immutable';

class Thread extends Tree{
	constructor(){
		super();
		this._thread = [];
		this._source = Observable.from( this._thread ).publish();
	}
	makeNode( value, n=this._node, l=this._level ){
		let val = value == undefined? false : value,
				level = l,
				node = n,
				subscription = this._source.subscribe( this.onNext.bind(this, node, level) )		
		return Map({
			subscription: subscription,
			value: value,
			__n: node,
			__l: level
		})		
	}	
	onNext( node, level, item ){
		this.goTo( node, level )
		switch(item.type){
			case 'SET':
				this.node = item.value
				break;
			case 'MERGE':
				this.node = {}.assign( this.node, item.value )
				break;
		}
	}
}

export default Thread;