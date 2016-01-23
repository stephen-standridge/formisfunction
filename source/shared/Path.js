import {Record, List} from 'immutable';

class Path extends Record(
	{'instructions':List() }
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
	back( ){
		return this.dispatch({ type:'REMOVE' })
	}
	toString(){
		return `${ this.get('instructions')
						    .reduce(function(a, b){ 
						    	return `${a}${b[0] + [].concat(b[1]).join(',')}`
						    }, '')
						  }z`	
	}
	dispatch( action ){
		let mut;
		switch( action.type ){
			case 'ADD':
				mut = this;
				mut = mut.set('instructions', 
					mut.get('instructions')
					.push([ action.prefix, action.point ]) );
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