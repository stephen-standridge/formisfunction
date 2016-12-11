var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ViewLayout Model
 * ==========
 */

var ViewLayout = new keystone.List('ViewLayout', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

ViewLayout.add({
	createdAt: { type: Date, default: Date.now },
	title: { type: String, required: true },
	type: {
		type: Types.Select, 
		options: '1xNVideo, other', 
		default: '1xNVideo'
	},
});

ViewLayout.relationship({ path: 'view', ref: 'View', refPath: 'layout' });


ViewLayout.defaultColumns = 'title';
ViewLayout.register();
