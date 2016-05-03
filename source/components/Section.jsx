import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class SectionFooter extends React.Component {
	render(){
	return (	<div className={`content__footer ${this.props.section}__footer`}>
			<div className={`content__footer-wrapper ${this.props.section}__footer-wrapper`}>
				<div className={`content__footer-item ${this.props.section}__footer-item`}>
				</div>
				<div className={`content__footer-title ${this.props.section}__footer-title`}>
					Static
				</div>						
				<div className={`content__footer-item ${this.props.section}__footer-item`}>
				</div>						
			</div>
		</div> )		
	}
}

SectionFooter.shouldComponentUpdate = shouldPureComponentUpdate

class SectionSidebar extends React.Component {
	render(){
		return (
			<div className={`${this.props.section}__sidebar content__sidebar`}></div>
		)	
	}
}

SectionSidebar.shouldComponentUpdate = shouldPureComponentUpdate


export {SectionFooter, SectionSidebar};