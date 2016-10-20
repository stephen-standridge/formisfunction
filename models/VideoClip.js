var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * VideoClip Model
 * ==========
 */

var VideoClip = new keystone.List('VideoClip', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

VideoClip.add({
	title: { type: String, required: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
	contents: { type: Types.Relationship, ref: 'ContentCollection', many: true },
	video: { type: Types.Relationship, ref: 'Video' }	
});

VideoClip.relationship({ path: 'contentCollections', ref: 'ContentCollection', refPath: 'videoClip' });

VideoClip.defaultColumns = 'title, description';
VideoClip.register();
