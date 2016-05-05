module.exports = {
  name: 'static',
  center: [
  	{ type: 'Three' },
  	{ type: 'LinearNavigation' }
  ],
  right: [
  	{ type: 'List',
	  	name: 'technologies',
	  	entries: [
		  	{ text: 'three.js', link: 'test' },
		  	{ text: 'blender', link: 'test' },	  	
		  	{ text: 'rx.js', link: 'test' },
		  	{ text: 'cycles', link: 'test' }
	  	]	},
  	{ type: 'List',
	  	name: 'documentation'	,
	  	entries: [
		  	{ text: `about`, link: 'test' },
		  	{ text: `another article`, link: 'test' }  	
		  ] },
		{ type: 'Versions' },
		{ type: 'Controls' }
  ]
}