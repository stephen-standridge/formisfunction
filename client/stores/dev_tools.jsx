import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'


const DevTools = process.env.NODE_ENV === 'test' ? 
	createDevTools(
	  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
	    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
	  </DockMonitor>) 
	: function() { return <div /> };

function connectDevTool(stores){
	if(process.env.NODE_ENV === 'test') { 
		stores.splice( 1,0, DevTools.instrument());
		return stores
	}
	return stores
}

export { DevTools, connectDevTool };