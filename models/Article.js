var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Article Model
 * ==========
 */

var Article = new keystone.List('Article', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Article.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 }
});

Article.relationship({ path: 'collection', ref: 'Collection', refPath: 'articles', many:true });

Article.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Article.defaultColumns = 'title, state|20%, publishedDate|20%';
Article.register();
