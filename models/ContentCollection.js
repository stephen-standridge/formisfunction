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
	createdAt: { type: Date, default: Date.now }
});

ContentCollection.relationship({ path: 'clips', ref: 'Clip', refPath: 'clips' });
ContentCollection.relationship({ path: 'articles', ref: 'Article', refPath: 'articles' });
ContentCollection.relationship({ path: 'views', ref: 'View', refPath: 'contents' });

ContentCollection.register();
