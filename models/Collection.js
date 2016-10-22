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
	type: { type: String },		
	createdAt: { type: Date, default: Date.now },
	audioClips: { type: Types.Relationship, ref: 'AudioClip', many: true },
	videoClips: { type: Types.Relationship, ref: 'VideoClip', many: true },
	articles: { type: Types.Relationship, ref: 'Article', many: true },
});

Collection.relationship({ path: 'view', ref: 'View', refPath: 'contentCollections' });

Collection.register();
