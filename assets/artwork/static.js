module.exports = {
  name: 'static',
  left: [],
  center: [
  	{ type: 'ThreePiece' },
  	{ type: 'LinearNavigation' }
  ],
  right: [
  	{ type: 'List',
	  	name: 'technologies',
	  	items: [
		  	{ text: 'three.js', href: 'test' },
		  	{ text: 'blender', href: 'test' },	  	
		  	{ text: 'rx.js', href: 'test' },
		  	{ text: 'cycles', to: 'test' }
	  	]	},
  	{ type: 'List',
	  	name: 'documentation'	,
	  	items: [
		  	{ text: `about`, to: 'test' },
		  	{ text: `another article`, to: 'test' }  	
		  ] },
		{ type: 'VersionsNavigation' },
		{ type: 'Controls' }
  ]
}