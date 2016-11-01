var async = require('async'),
		keystone = require('keystone');

var View = keystone.list('View');

/**
 * List Views
 */
var list = function(req, res) {
	View.model.find(function(err, items) {
		
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
		.exec(function(err, item) {
			
			if (err) return res.apiError('database error', err);
			if (!item) return res.apiError('not found');
			// returns view: {}
			// collections: [
			// ]
			//
			res.apiResponse({
				view: item
			});
		
	});
}
exports = module.exports = { get:get, list:list }