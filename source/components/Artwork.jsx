import React from 'react';
import Footer from './Footer';

const Artwork = (props) =>
	( <div className='artwork__wrapper content__wrapper'>					
		<div className='artwork__content content' >
		</div>			
		<ArtworkSidebar></ArtworkSidebar>		
	</div> )

class ArtworkSidebar extends React.Component {
	render(){
		return (
			<div className='artwork__sidebar content__sidebar'>
			</div>)	
	}
}

export default Artwork