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
	video: { type: Types.Relationship, ref: 'Video' }	
});

VideoClip.relationship({ path: 'collection', ref: 'Collection', refPath: 'videoClips' });

VideoClip.defaultColumns = 'title, description';
VideoClip.register();
