var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Collection Model
 * ==========
 */

var Collection = new keystone.List('Collection', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Collection.add({
	title: { type: String, required: true },		
	createdAt: { type: Date, default: Date.now },
	medias: { type: Types.Relationship, ref: 'Media', many: true },
	articles: { type: Types.Relationship, ref: 'Article', many: true }
});

Collection.relationship({ path: 'view', ref: 'View', refPath: 'collections' });

Collection.register();
