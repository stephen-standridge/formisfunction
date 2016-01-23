import Dispatcher from './Dispatcher'

var LineDispatcher = Object.assign({}, Dispatcher.prototype, {
	handleViewAction: function(action){
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	}
})

module.exports = LineDispatcher;