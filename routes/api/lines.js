var async = require('async'),
		keystone = require('keystone');

var Line = keystone.list('Line');
var View = keystone.list('View');

/**
 * Get Line by ID
 */
var index = function(req, res) {
	Line.model.find()
		.populate({ path: 'views', model: 'View' })		
		.exec(function(err, items) {

		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			lines: items
		});
		
	});
}


var get = function(req, res) {
	Line.model.find()
			.where('slug', req.params.slug)
			.exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		res.apiResponse({
			lines: item
		});
		
	});
}

exports = module.exports = { get:get, index:index }