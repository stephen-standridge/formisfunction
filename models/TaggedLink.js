var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TaggedLink Model
 * ==========
 */

var TaggedLink = new keystone.List('TaggedLink', {
	map: { name: 'slug' },
	autokey: { path: 'slug', from: 'slug', unique: true },
	drilldown: 'link'		
});

TaggedLink.add({
	slug: { type: String },
	tag: { type: String },
	link: { type: Types.Relationship, ref: 'Link' }
});

TaggedLink.relationship({ path: 'view', ref: 'View', refPath: 'tagged_links' });


TaggedLink.register();
