import {fromJS} from 'immutable';

const positions = fromJS([
	2, 5, 9, 14, 48, 53, 58, 62, 65, 69, 72, 76, 103, 114, 115, 120, 123, 128, 157, 161, 164, 195, 198, 200, 204, 209, 214
	])
const halfCircumference = Number( (0.5 * (0.33 * (215 * Math.PI)) ).toFixed(2) );
3.14 * radius = halfCircumference

const space = {
	whole: 215,
	children: fromJS([
		{ 
			min: 0,
			width: halfCircumference,			
			max: halfCircumference,
		},
		{ 
			min: (0.5 * 215) - (0.5 * halfCircumference),
			width: halfCircumference,			
			max: (0.5 * 215) - (0.5 * halfCircumference) + halfCircumference,
		},	
		{ 
			min: 215 - (halfCircumference),
			width: halfCircumference,			
			max: 215,
		}	
	])
}
const firstSpace = positions.filter(function(i){ 
	return (
		i >= space.children.getIn([0, 'min']) &&
		i <= space.children.getIn([0, 'max'])
	)
})

const secondSpace = positions.filter(function(i){ 
	return ( 
		i >= space.children.getIn([1, 'min']) &&
		i <= space.children.getIn([1, 'max'])
	)
})
const thirdSpace = positions.filter(function(i){ 
	return ( 
		i >= space.children.getIn([2, 'min']) &&
		i <= space.children.getIn([2, 'max'])
	)
})

const firstUnique = positions.filter(function(i){ 
	return ( 
		i >= space.children.getIn([0, 'min']) &&
		i <= space.children.getIn([0, 'max']) &&
		i < space.children.getIn([1, 'min'])
	)
})
const secondUnique = positions.filter(function(i){ 
	return (
		i >= space.children.getIn([1, 'min']) &&
		i <= space.children.getIn([1, 'max']) &&
		i > space.children.getIn([1, 'max']) &&
		i < space.children.getIn([2, 'min'])
	)
})
const thirdUnique = positions.filter(function(i){ 
	return (
		i >= space.children.getIn([2, 'min']) &&
		i <= space.children.getIn([2, 'max']) &&
		i > space.children.getIn([1, 'max'])
	)
})

const firstOrSecond = positions.filter(function(i){ 
	return (
		i >= space.children.getIn([0, 'min']) &&
		i <= space.children.getIn([0, 'max']) &&
		i > space.children.getIn([1, 'min'])
	)
})

const secondOrThird = positions.filter(function(i){ 
	return (
		i >= space.children.getIn([2, 'min']) &&
		i <= space.children.getIn([2, 'max']) &&
		i < space.children.getIn([1, 'max'])
	)
})

//given a unique index will generate a point
//that is ensured to be the min distance 
//from the closest point from center

//ensures no line will overlap with any other line.
const choosePoint = function(i,center, min){ return (-1.0 + ((1.0 + i%2 ) * (i%2))) * (center + min * Math.ceil(i/min)) }
const determinePole = function(){];
	
export { positions, space, 
	firstUnique, firstSpace, firstOrSecond,
	secondUnique, secondSpace, secondOrThird,
	thirdUnique, thirdSpace  }