let _callbacks = [];
let _promises = [];

let Dispatcher = function() {};
Dispatcher.prototype = Object.assign({}, Dispatcher.prototype, {
	register: function( callback ) {
		_callbacks.push( callback );
		return _callbacks.length -1;
	},
	dispatch: function( payload ) {
		let resolves = [];
		let rejects = [];
		_promises = _callbacks.map(function(_, i) {
			return new Promise(function(resolve, reject) {
				resolves[i] = resolve;
				rejects[i] = rejects;
			})
		})
		_callbacks.forEach(function(callback, i) {
			Promise.resolve(callback(payload)).then(function(){
				resolves[i](payload);
			}, function(){
				rejects[i](new Error('Dispatcher callback unsuccessful'))
			})
		})
		_promises = [];
	}
})

export default Dispatcher