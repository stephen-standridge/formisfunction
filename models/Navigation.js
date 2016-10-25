var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Navigation Model
 * ==========
 */

var Navigation = new keystone.List('Navigation', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Navigation.add({
	title: { type: String, required: true },
	links: { type: Types.Relationship, ref: 'Link', many: true }
});

Navigation.register();
