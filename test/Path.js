import Path from '../source/tapestry/Path.js';
import Tree from 'basic-tree';
import {fromJS, Record, List, is} from 'immutable';
import {expect} from 'chai';

describe('Path', ()=>{
	let P, control;

	it('should have the default functions of an immutable list', ()=>{
		P = new Path()
		expect(P.get('instructions')).to.equal(List())
	})
	it('should be able to move to a location', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ]).toJS())
		expect(P.print()).to.equal('M0,0')
	})
	it('should be able to make a line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.lineTo([1,1])
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'l',[1,1] ]).toJS())
		expect(P.print()).to.equal('M0,0l1,1')
	})
	it('should be able to make a vertical line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.verticalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'v', 10 ]).toJS())
		expect(P.print()).to.equal('M0,0v10')
	})	
	it('should be able to make a horizontal line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.horizontalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'h', 10 ]).toJS())
		expect(P.print()).to.equal('M0,0h10')
	})
	it('should be able to remove a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.horizontalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'h', 10 ]).toJS())
		expect(P.print()).to.equal('M0,0h10')
		P = P.back()
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ]).toJS())
		expect(P.print()).to.equal('M0,0')
	})
	it('should be able to close a path', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.horizontalTo(10)
		P = P.close()
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'h', 10 ], [ 'z', '' ]).toJS())
		expect(P.print()).to.equal('M0,0h10z')		
	})
	it('should be able to handle angle', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.angleTo(45, 10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'l', [7.071, 7.071] ]).toJS())
		expect(P.print()).to.equal('M0,0l7.071,7.071')				
	})
	it('should be able to be a tree node', ()=>{
		let T = new Tree({config: {branches: 3, nodes: 3}})
		T.root = new Path()
		T.root = T.root.moveTo([1,1])
		expect(T.root.print()).to.equal('M1,1')
	})
})