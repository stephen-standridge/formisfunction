var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Render the view
	res.sendFile('../../public/index.html',{root: __dirname});
};
