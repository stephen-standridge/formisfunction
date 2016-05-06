import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class LinearNavigation extends React.Component {
	render(){
		return (	<div className={`piece__footer  part`}>
				<div className={`piece__footer-wrapper`}>
					<div className={`piece__footer-item`}>
						{'<'}
					</div>
					<div className={`piece__footer-title`}>
						<h2>{this.props.pieceName}</h2>
					</div>						
					<div className={`piece__footer-item`}>
						{'>'}
					</div>						
				</div>
			</div> )		
	}
}

LinearNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default LinearNavigation