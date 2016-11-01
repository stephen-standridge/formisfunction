var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * View Model
 * ==========
 */

var View = new keystone.List('View', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	drilldown: 'top_link right_link bottom_link left_link'	
});

View.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	layout: { type: Types.Select, options: 'only', default: 'only', index: true },	
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	collections: { type: Types.Relationship, ref: 'Collection', many: true },
	top_link: { type: Types.Relationship, ref: 'Link' },	
	right_link: { type: Types.Relationship, ref: 'Link' },
	bottom_link: { type: Types.Relationship, ref: 'Link' },
	left_link: { type: Types.Relationship, ref: 'Link' }	
});

View.defaultColumns = 'title, state|20%';
View.register();
