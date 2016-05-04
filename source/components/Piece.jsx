import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class PieceBody extends React.Component {
	render(){		
 		return (	<div className='pieces__wrapper'>		
			<div className='pieces__wrapper-content'> 
				<PieceSidebar piece={this.props.name} content={this.props.sidebarLeft} ></PieceSidebar>
				<div className={`${this.props.name}__wrapper content__wrapper`}>
					{this.props.children}
				</div>
				<PieceSidebar piece={this.props.name} content={this.props.sidebarRight} ></PieceSidebar>		
			</div>
			<SectionFooter piece={this.props.name} content={this.props.footer} ></SectionFooter>									
		</div> )
	}

}
PieceBody.shouldComponentUpdate = shouldPureComponentUpdate

class SectionFooter extends React.Component {
	render(){
		return (	<div className={`content__footer ${this.props.piece}__footer`}>
				<div className={`content__footer-wrapper ${this.props.piece}__footer-wrapper`}>
					<div className={`content__footer-item ${this.props.piece}__footer-item`}>
					</div>
					<div className={`content__footer-title ${this.props.piece}__footer-title`}>
						{this.props.content}
					</div>						
					<div className={`content__footer-item ${this.props.piece}__footer-item`}>
					</div>						
				</div>
			</div> )		
	}
}

SectionFooter.shouldComponentUpdate = shouldPureComponentUpdate

class PieceSidebar extends React.Component {
	render(){
		return (
			<div className={`${this.props.piece}__sidebar content__sidebar`}>
				{this.props.content}
			</div>
		)	
	}
}

PieceSidebar.shouldComponentUpdate = shouldPureComponentUpdate


export default PieceBody;