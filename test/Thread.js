import Path from '../source/tapestry/Path.js';
import Thread from '../source/tapestry/Thread.js';
import {fromJS, Record, List, is} from 'immutable';
import {Observable} from 'rx';
import {expect} from 'chai'

describe('#Thread', ()=>{
	let T, P, control = Observable.from([]).publish();
	it('should have a central observeable', ()=>{
		T = new Thread({config:{branches:3}})		
		expect(T._source.constructor).to.equal(control.constructor)
	})
	it('should add a subscription to each of its nodes', ()=>{
		T = new Thread({config:{branches:3}})
		T.root = 'test';
		expect(T.rootItem.get('subscription').constructor).to.equal(control.subscribe().constructor)
	})
	it('should propogate thread events to all of its nodes', ()=>{
		T = new Thread({config:{branches:3}})
		T.root = 'test';
		T.toNth(2)
		T.node = 'test2'
		T._thread.push({type:'SET', value:'derp'})
		T._source.connect()		
		expect(T.toJS('value')).to.eql(['derp',undefined,undefined,'derp'])	
	})
})
