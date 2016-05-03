import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class SectionBody extends React.Component {
	render(){		
 		return (	<div className='sections__wrapper'>		
			<div className='sections__wrapper-content'> 
				<SectionSidebar section={this.props.name} content={this.props.sidebarLeft} ></SectionSidebar>
				<div className={`${this.props.name}__wrapper content__wrapper`}>
					{this.props.children}
				</div>
				<SectionSidebar section={this.props.name} content={this.props.sidebarRight} ></SectionSidebar>		
			</div>
			<SectionFooter section={this.props.name} content={this.props.footer} ></SectionFooter>									
		</div> )
	}

}
SectionBody.shouldComponentUpdate = shouldPureComponentUpdate

class SectionFooter extends React.Component {
	render(){
		return (	<div className={`content__footer ${this.props.section}__footer`}>
				<div className={`content__footer-wrapper ${this.props.section}__footer-wrapper`}>
					<div className={`content__footer-item ${this.props.section}__footer-item`}>
					</div>
					<div className={`content__footer-title ${this.props.section}__footer-title`}>
						{this.props.content}
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
			<div className={`${this.props.section}__sidebar content__sidebar`}>
				{this.props.content}
			</div>
		)	
	}
}

SectionSidebar.shouldComponentUpdate = shouldPureComponentUpdate


export default SectionBody;