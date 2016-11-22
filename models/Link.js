var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Link Model
 * ==========
 */

var Link = new keystone.List('Link', {
	map: { name: 'href' },
	autokey: { path: 'slug', from: 'href', unique: true },
});

Link.add({
	href: { type: String, required: true },
	url: { type: String },
	target: { type: Types.Select, options: 'router, self, blank', default: 'router', index: true }
});

Link.relationship({ path: 'main-navigation', ref: 'MainNavigation', refPath: 'links' });


Link.register();
