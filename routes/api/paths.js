var async = require('async'),
		keystone = require('keystone');

var Path = keystone.list('Path');

/**
 * List Paths
 */
var index = function(req, res) {
	Path.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		//returns paths: [
		// { views: [
		// 		id, id, id
		// 	 ] }
		// ]
		res.apiResponse({
			paths: items
		});
		
	});
}

/**
 * Get Path by ID
 */
var get = function(req, res) {
	Path.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			path: item
		});
		
	});
}

exports = module.exports = { get:get, index:index }