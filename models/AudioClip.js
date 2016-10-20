var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AudioClip Model
 * ==========
 */

var AudioClip = new keystone.List('AudioClip', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

AudioClip.add({
	title: { type: String, required: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
	audio: { type: Types.Relationship, ref: 'Audio' }	
});

AudioClip.relationship({ path: 'contentCollections', ref: 'ContentCollection', refPath: 'audioClip', many:true });

AudioClip.defaultColumns = 'title, description';
AudioClip.register();
