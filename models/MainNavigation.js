var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MainNavigation Model
 * ==========
 */

var MainNavigation = new keystone.List('MainNavigation', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

MainNavigation.add({
	title: { type: String, required: true },
	links: { type: Types.Relationship, ref: 'Link', many: true }
});

MainNavigation.register();
