import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class VersionsNavigation extends React.Component {
	render(){
		return ( <div className='versionsNavigation part'>
			<h3 className="strong"> Versions </h3>	
			</div> )		
	}
}

VersionsNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default VersionsNavigation