import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class VersionsNavigation extends React.Component {
	render(){
		return ( <div className='versionsNavigation'>
			<h1> 'Versions Navigation' </h1>	
			</div> )		
	}
}

VersionsNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default VersionsNavigation