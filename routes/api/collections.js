var async = require('async'),
		keystone = require('keystone');

var Collection = keystone.list('Collection');

/**
 * Get Collection by ID
 */
var get = function(req, res) {
	Collection.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		// returns collection: {}
		// collections: [
		// ]
		//
		res.apiResponse({
			collection: item
		});
		
	});
}

exports = module.exports = { get:get }