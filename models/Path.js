var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Path Model
 * ==========
 */

var Path = new keystone.List('Path', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Path.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	views: { type: Types.Relationship, ref: 'View', many: true }
});



Path.defaultColumns = 'title, description';
Path.register();
