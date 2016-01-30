import {fromJS} from 'immutable';

const lines = fromJS([
	{
		width: 64,
		directions: [
			{ type: 'vertical', length: 338 },
			{ type: 'diagonal', length: 63 },
			{ type: 'vertical', length: 19 },
			{ type: 'diagonal', length: -31 },
			{ type: 'vertical', length: 50 }			
		]
	}, 
	{
		width: 47,
		directions: [
			{ type: 'vertical', length: 213 },
			{ type: 'diagonal', length: 15 },
			{ type: 'vertical', length: 44 },
			{ type: 'diagonal', length: -12 },
			{ type: 'vertical', length: 71 },
			{ type: 'diagonal', length: 24 },
			{ type: 'vertical', length: 57 },
			{ type: 'diagonal', length: 17 },
			{ type: 'vertical', length: 43 }			
		]
	}, 
	{
		width: 95,
		directions: [
			{ type: 'vertical', length: 340 },
			{ type: 'diagonal', length: 44 },
			{ type: 'horizontal', length: 8 },
			{ type: 'diagonal', length: 12 },
			{ type: 'vertical', length: 32 },
			{ type: 'diagonal', length: 11 },
			{ type: 'vertical', length: 13 },
			{ type: 'diagonal', length: 9 },
			{ type: 'vertical', length: 27 }	
		]
	}, 
	{
		width: 74,
		directions: [
			{ type: 'vertical', length: 353 },
			{ type: 'diagonal', length: 37 },
			{ type: 'horizontal', length: 30 },
			{ type: 'diagonal', length: 10 },
			{ type: 'vertical', length: 101 }
		]
	}, 
	{
		width: 63,
		directions: [
			{ type: 'vertical', length: 318 },
			{ type: 'diagonal', length: 10 },
			{ type: 'vertical', length: 36 },
			{ type: 'diagonal', length: 19 },
			{ type: 'horizontal', length: 21 },
			{ type: 'diagonal', length: 14 },
			{ type: 'vertical', length: 102 }			
		]
	},
	{
		width: 31,
		directions: [
			{ type: 'vertical', length: 172 },
			{ type: 'diagonal', length: -12 },
			{ type: 'vertical', length: 142 },
			{ type: 'diagonal', length: 16 },
			{ type: 'vertical', length: 99 },
			{ type: 'diagonal', length: 16 },
			{ type: 'vertical', length: 42 }		
		]
	},
	{
		width: 62,
		directions: [
			{ type: 'vertical', length: 217 },
			{ type: 'diagonal', length: 15 },
			{ type: 'vertical', length: 59 },
			{ type: 'diagonal', length: 9 },
			{ type: 'horizontal', length: 9 },
			{ type: 'diagonal', length: 31 },
			{ type: 'vertical', length: 176 }	
		]
	},
	{
		width: 18,
		directions: [
			{ type: 'vertical', length: 161 },
			{ type: 'diagonal', length: -14 },
			{ type: 'vertical', length: 245 },
			{ type: 'diagonal', length: 10 },
			{ type: 'vertical', length: 21 },
			{ type: 'diagonal', length: -13 },
			{ type: 'vertical', length: 34 }	
		]
	},
	{
		width: 67,
		directions: [
			{ type: 'vertical', length: 154 },
			{ type: 'diagonal', length: 17 },
			{ type: 'vertical', length: 196 },
			{ type: 'diagonal', length: 33 },
			{ type: 'vertical', length: 15 },
			{ type: 'diagonal', length: 6 },
			{ type: 'vertical', length: 20 },
			{ type: 'diagonal', length: 13 },
			{ type: 'vertical', length: 48 }				
		]
	},
	{
		width: 71,
		directions: [
			{ type: 'vertical', length: 139 },
			{ type: 'diagonal', length: -10 },
			{ type: 'vertical', length: 181 },
			{ type: 'diagonal', length: -9 },
			{ type: 'vertical', length: 144 },
			{ type: 'diagonal', length: -50 },
			{ type: 'vertical', length: 40 }
		]
	},
	{
		width: 31,
		directions: [
			{ type: 'vertical', length: 371 },
			{ type: 'diagonal', length: 30 },
			{ type: 'vertical', length: 100 }
		]
	},
	{
		width: 52,
		directions: [
			{ type: 'vertical', length: 347 },
			{ type: 'diagonal', length: 40 },
			{ type: 'vertical', length: 62 },
			{ type: 'diagonal', length: 12 },
			{ type: 'vertical', length: 41 }
		]
	},
	{
		width: 57,
		directions: [
			{ type: 'vertical', length: 346 },
			{ type: 'diagonal', length: 59 },
			{ type: 'vertical', length: 20 },
			{ type: 'diagonal', length: -9 },
			{ type: 'vertical', length: 11 },
			{ type: 'diagonal', length: 7 },
			{ type: 'vertical', length: 51 }
		]
	},
	{
		width: 22,
		directions: [
			{ type: 'vertical', length: 276 },
			{ type: 'diagonal', length: 12 },
			{ type: 'vertical', length: 103 },
			{ type: 'diagonal', length: -22 },
			{ type: 'vertical', length: 94 }
		]
	},
		{
		width: 41,
		directions: [
			{ type: 'vertical', length: 158 },
			{ type: 'diagonal', length: -16 },
			{ type: 'vertical', length: 205 },
			{ type: 'diagonal', length: -20 },
			{ type: 'vertical', length: 13 },
			{ type: 'diagonal', length: 8 },
			{ type: 'vertical', length: 27 },
			{ type: 'diagonal', length: -13 },
			{ type: 'vertical', length: 38 }			
		]
	},
		{
		width: 33,
		directions: [
			{ type: 'vertical', length: 188 },
			{ type: 'diagonal', length: -14 },
			{ type: 'vertical', length: 76 },
			{ type: 'diagonal', length: -12 },
			{ type: 'vertical', length: 93 },
			{ type: 'diagonal', length: -7 },
			{ type: 'vertical', length: 112 }
		]
	},
		{
		width: 25,
		directions: [
			{ type: 'vertical', length: 94 },
			{ type: 'diagonal', length: 13 },
			{ type: 'vertical', length: 92 },
			{ type: 'diagonal', length: -13 },
			{ type: 'vertical', length: 229 },
			{ type: 'diagonal', length: -11 },
			{ type: 'vertical', length: 50 }
		]
	},
		{
		width: 24,
		directions: [
			{ type: 'vertical', length: 94 },
			{ type: 'diagonal', length: 12 },
			{ type: 'vertical', length: 92 },
			{ type: 'diagonal', length: -12 },
			{ type: 'vertical', length: 104 },
			{ type: 'diagonal', length: -24 },
			{ type: 'vertical', length: 96 }
		]
	},
		{
		width: 36,
		directions: [
			{ type: 'vertical', length: 198 },
			{ type: 'diagonal', length: -14 },
			{ type: 'vertical', length: 55 },
			{ type: 'diagonal', length: 35 },
			{ type: 'vertical', length: 201 }
		]
	},
		{
		width: 44,
		directions: [
			{ type: 'vertical', length: 275 },
			{ type: 'diagonal', length: -16 },
			{ type: 'vertical', length: 23 },
			{ type: 'diagonal', length: -17 },
			{ type: 'vertical', length: 62 },
			{ type: 'diagonal', length: -10 },
			{ type: 'vertical', length: 98 }
		]
	},
		{
		width: 18,
		directions: [
			{ type: 'vertical', length: 275 },
			{ type: 'diagonal', length: -10 },
			{ type: 'vertical', length: 32 },
			{ type: 'diagonal', length: -8 },
			{ type: 'vertical', length: 176 }
		]
	},
		{
		width:41,
		directions: [
			{ type: 'vertical', length: 350 },
			{ type: 'diagonal', length: 40 },
			{ type: 'vertical', length: 60 },
			{ type: 'diagonal', length: -20 },
			{ type: 'vertical', length: 31 }
		]
	},
		{
		width: 42,
		directions: [
			{ type: 'vertical', length: 183 },
			{ type: 'diagonal', length: -6 },
			{ type: 'vertical', length: 197 },
			{ type: 'diagonal', length: -22 },
			{ type: 'vertical', length: 21 },
			{ type: 'diagonal', length: -15 },
			{ type: 'vertical', length: 59 }
		]
	},
		{
		width: 63,
		directions: [
			{ type: 'vertical', length: 373 },
			{ type: 'diagonal', length: -63 },
			{ type: 'vertical', length: 9 },
			{ type: 'diagonal', length: 11 },
			{ type: 'vertical', length: 46 }
		]
	},
		{
		width: 36,
		directions: [
			{ type: 'vertical', length: 348 },
			{ type: 'diagonal', length: 36 },
			{ type: 'vertical', length: 116 }
		]
	},
		{
		width: 50,
		directions: [
			{ type: 'vertical', length: 348 },
			{ type: 'diagonal', length: 45 },
			{ type: 'vertical', length: 51 },
			{ type: 'diagonal', length: 5 },
			{ type: 'vertical', length: 53 }
		]
	}							 				
]);
const complexity = lines.map(function(l){ return l.get('directions').size }).toJS();
const widths = lines.map(function(l){ 
				return l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'horizontal' || i.get('type') == 'diagonal' 
					})
					.map((i)=>{
						return i.get('length')
					})
					.reduce((a, b)=>{ return a+b}, 0) }).toJS()
const widthsInTens = lines.map(function(l){ 
				return l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'horizontal' || i.get('type') == 'diagonal' 
					})
					.map((i)=>{
						return i.get('length')
					})
					.reduce((a, b)=>{ return a+b}, 0) }).
					map((i)=>{
						return Math.round( i * 0.1 )
					}).toJS()
const verticals = lines.map(function(l){ 
				return l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					})
				}).toJS()
const firstVerts = lines.map(function(l){ 
				return Math.round(l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					}).get(0) /50)
				}).toJS()
const secondVerts = lines.map(function(l){ 
				return Math.round(l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					}).get(1)/50)
				}).toJS()
const thirdVerts = lines.map(function(l){ 
				return Math.round(l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					}).get(2)/50) || ''
				}).toJS()
const fourthVerts = lines.map(function(l){ 
				return Math.round(l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					}).get(3)/50) || ''
				}).toJS()
const fifthVerts = lines.map(function(l){ 
				return Math.round( l.get('directions')
					.filter((i)=>{ 
						return i.get('type') == 'vertical' 
					})
					.map((i)=>{
						return i.get('length')
					}).get(4)/50 )|| ''
				}).toJS()
export {lines, widths, widthsInTens, verticals, firstVerts, secondVerts, thirdVerts, fourthVerts, fifthVerts};