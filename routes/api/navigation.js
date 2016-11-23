var async = require('async'),
		keystone = require('keystone');

var MainNavigation = keystone.list('MainNavigation');

/**
 * List Views
 */
var index = function(req, res) {
	MainNavigation.model.find()
		.where('slug', 'index')
		.populate('links')		
		.exec(function(err, nav) {

		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			navigation: nav[0]
		});
		
	});
}

exports = module.exports = { index:index }