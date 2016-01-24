import {Record, List} from 'immutable';
import {DEG_TO_RAD} from '../constants/linework.js';

class Path extends Record(
	{'instructions':List(), 'subscription': {} }
) {
	horizontalTo( p ){
		if(!p){ return }
		return this.dispatch({ type:'ADD', prefix: 'h', point: p })
	}
	verticalTo( p ){
		if(!p){ return }
		return this.dispatch({ type:'ADD', prefix: 'v', point: p })
	}	
	lineTo( p ){
		if(!p){ return }
		return this.dispatch({ type:'ADD', prefix: 'l', point: p })
	}	
	moveTo( p ){
		if(!p){ return }
		return this.dispatch({ type:'ADD', prefix: 'M', point: p })
	}
	angleTo( deg, p ){
		let x, y, rad = this.toRad(deg);
		x = Number( ( p * Math.cos( rad ) ).toFixed(3) )
		y = Number( ( p * Math.sin( rad ) ).toFixed(3) )
		return this.dispatch({ type:'ADD', prefix: 'l', point: [x, y] })
	}	
	toRad( deg ){
		return deg * DEG_TO_RAD
	}
	close(){
		return this.dispatch({ type:'ADD', prefix: 'z' })
	}
	back( ){
		return this.dispatch({ type:'REMOVE' })
	}
	print(){
		return `${ this.get('instructions')
						    .reduce(function(a, b){ 
						    	return `${a}${b[0] + [].concat(b[1]).join(',')}`
						    }, '')
						  }`	
	}
	dispatch( action ){
		let mut;
		switch( action.type ){
			case 'ADD':
				mut = this;
				mut = mut.set('instructions', 
					mut.get('instructions')
					.push([ action.prefix, action.point || '' ]) );
				return mut
			case 'REMOVE':
				mut = this;			
				mut = mut.set('instructions', 
					mut.get('instructions')
					.pop() );
				return mut
		}
	}	
}

export default Path;