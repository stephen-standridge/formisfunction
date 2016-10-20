var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ContentCollection Model
 * ==========
 */

var ContentCollection = new keystone.List('ContentCollection', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ContentCollection.add({
	title: { type: String, required: true },		
	createdAt: { type: Date, default: Date.now },
	audioClip: { type: Types.Relationship, ref: 'AudioClip', many: true },
	videoClip: { type: Types.Relationship, ref: 'VideoClip', many: true },
	articles: { type: Types.Relationship, ref: 'Articles', many: true },
});

ContentCollection.relationship({ path: 'views', ref: 'View', refPath: 'contents' });

ContentCollection.register();
