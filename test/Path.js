import Path from '../source/shared/Path.js';
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
		expect(P.toString()).to.equal('M0,0z')
	})
	it('should be able to make a line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.lineTo([1,1])
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'l',[1,1] ]).toJS())
		expect(P.toString()).to.equal('M0,0l1,1z')
	})
	it('should be able to make a vertical line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.verticalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'v', 10 ]).toJS())
		expect(P.toString()).to.equal('M0,0v10z')
	})	
	it('should be able to make a horizontal line to a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.horizontalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'h', 10 ]).toJS())
		expect(P.toString()).to.equal('M0,0h10z')
	})
	it('should be able to remove a point', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.horizontalTo(10)
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ],[ 'h', 10 ]).toJS())
		expect(P.toString()).to.equal('M0,0h10z')
		P = P.back()
		expect(P.get('instructions').toJS()).to.eql(List.of(['M',[0,0] ]).toJS())
		expect(P.toString()).to.equal('M0,0z')
	})
	it('should be able to handle diagonals', ()=>{
		P = new Path()
		P = P.moveTo([0,0])
		P = P.diagonalTo([45, 10])
	})
})