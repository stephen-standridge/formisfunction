import React from 'react';

const Footer = ({section}) =>
	(	<div className={`content__footer ${section}__footer`}>
			<div className={`content__footer-wrapper ${section}__footer-wrapper`}>
				<div className={`content__footer-item ${section}__footer-item`}>
				</div>
				<div className={`content__footer-title ${section}__footer-title`}>
					Static
				</div>						
				<div className={`content__footer-item ${section}__footer-item`}>
				</div>						
			</div>
		</div>)

export default Footer;