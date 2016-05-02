import React from 'react';

const Documentation = (props) =>
	( <div className='documentation__wrapper content__wrapper'>		
		<DocumentationSidebar></DocumentationSidebar>
		<div className='documentation__content content'>
		</div>			
	</div> )	

class DocumentationSidebar extends React.Component {
	render(){
		return (
			<div className='documentation__sidebar content__sidebar'></div>
		)	
	}
}

export default Documentation