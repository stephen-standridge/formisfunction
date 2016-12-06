var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * LineLayout Model
 * ==========
 */

var LineLayout = new keystone.List('LineLayout', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

LineLayout.add({
	createdAt: { type: Date, default: Date.now },
	title: { type: String, required: true },
	type: {
		type: Types.Select, 
		options: 'OneSelected', 
		default: 'OneSelected'
	},
	selected: { type: Types.Boolean, dependsOn: { type: 'OneSelected' } }
});

LineLayout.relationship({ path: 'line', ref: 'Line', refPath: 'layout' });


LineLayout.defaultColumns = 'title, type';
LineLayout.register();
