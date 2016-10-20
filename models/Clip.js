var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Clip Model
 * ==========
 */

var Clip = new keystone.List('Clip', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Clip.add({
	title: { type: String, required: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
	contents: { type: Types.Relationship, ref: 'ContentCollection', many: true },
});

Clip.relationship({ path: 'videoClip', ref: 'Video', refPath: 'clips' });
Clip.relationship({ path: 'audioClip', ref: 'Audio', refPath: 'clips' });

Clip.defaultColumns = 'title, description';
Clip.register();
