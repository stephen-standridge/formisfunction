var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Media Model
 * ==========
 */

var Media = new keystone.List('Media', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Media.add({
	title: { type: String, required: true },
	description: { type: String },
	url: { type: String },
	type: { type: Types.Select, options: 'audio, video, image', default: 'video', index: true },	
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } }
});

Media.plural = 'media'

Media.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Media.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Media.register();
