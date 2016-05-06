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
	  	items: [
		  	{ text: 'react', href: 'test' },
		  	{ text: 'immutable', href: 'test' },	  	
		  	{ text: 'basic-tree', to: 'test' },
		  	{ text: 'svg', href: 'test' }
	  	]	},
  	{ type: 'List',
	  	name: 'documentation'	,
	  	items: [
		  	{ text: `about`, to: 'test' },
		  	{ text: `what is this?`, to: 'test' }  	
		  ] },
		{ type: 'VersionsNavigation' },
		{ type: 'Controls' }
  ]
}