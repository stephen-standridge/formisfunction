module.exports = {
  name: 'ryb',
  left: [],
  center: [
  	{ type: 'SVGPiece' },
  	{ type: 'LinearNavigation' }
  ],  
  right: [
  	{ type: 'List',
	  	name: 'technologies',
	  	entries: [
		  	{ text: 'react', link: 'test' },
		  	{ text: 'immutable', link: 'test' },	  	
		  	{ text: 'basic-tree', link: 'test' },
		  	{ text: 'svg', link: 'test' }
	  	]	},
  	{ type: 'List',
	  	name: 'documentation'	,
	  	entries: [
		  	{ text: `about`, link: 'test' },
		  	{ text: `what is this?`, link: 'test' }  	
		  ] },
		{ type: 'VersionsNavigation' },
		{ type: 'Controls' }
  ]
}