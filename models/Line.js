var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Line Model
 * ==========
 */

var Line = new keystone.List('Line', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	drilldown: 'views'			
});

Line.add({
	createdAt: { type: Date, default: Date.now },
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	layout: { type: Types.Select, options: 'only', default: 'only', index: true },
	publishedAt: Date,
	views: { type: Types.Relationship, ref: 'View', many: true}
});



Line.defaultColumns = 'title, state|20%';
Line.register();
