var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * View Model
 * ==========
 */

var View = new keystone.List('View', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

View.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	contents: { type: Types.Relationship, ref: 'ContentCollection', many: true }
});

// View.relationship({ path: 'view_collections', ref: 'ViewCollection', refPath: 'views' });


View.defaultColumns = 'title, state|20%';
View.register();
