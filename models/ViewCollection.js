var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ViewCollection Model
 * ==========
 */

var ViewCollection = new keystone.List('ViewCollection', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ViewCollection.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	views: { type: Types.Relationship, ref: 'View', many: true }
});



ViewCollection.defaultColumns = 'title, description';
ViewCollection.register();
