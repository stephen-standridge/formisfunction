var async = require('async'),
		keystone = require('keystone');

var View = keystone.list('View');

/**
 * List Views
 */
var list = function(req, res) {
	View.model.find()
		.populate('collections tagged_links')
		.exec(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			views: items
		});
		
	});
}

/**
 * Get View by ID
 */

var get = function(req, res) {
	View.model.find()
		.where('slug', req.params.slug)
		.populate('collections tagged_links')
		.exec(function(err, item) {
			
			if (err) return res.apiError('database error', err);
			if (!item){
				return View.model.find().where('slug', '404')
						.populate('collections tagged_links')				
						.exec(function(err, item) {
					if (err) return res.apiError('database error', err);
					res.apiResponse({
						views: item
					});
				})
			}
			res.apiResponse({
				views: item
			});
		
	});
}
exports = module.exports = { get:get, list:list }