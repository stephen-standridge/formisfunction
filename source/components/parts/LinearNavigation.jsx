import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class LinearNavigation extends React.Component {
	render(){
		return (	<div className={`piece__footer ${this.props.section}__footer`}>
				<div className={`piece__footer-wrapper ${this.props.section}__footer-wrapper`}>
					<div className={`piece__footer-item ${this.props.section}__footer-item`}>
					</div>
					<div className={`piece__footer-title ${this.props.section}__footer-title`}>
						{this.props.title}
					</div>						
					<div className={`piece__footer-item ${this.props.section}__footer-item`}>
					</div>						
				</div>
			</div> )		
	}
}

LinearNavigation.shouldComponentUpdate = shouldPureComponentUpdate

export default LinearNavigation