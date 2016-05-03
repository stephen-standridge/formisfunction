import React from 'react';

class Greeting extends React.Component {
	render(){
		return ( <div className='greeting__wrapper content__wrapper'>		
			<GreetingSidebar></GreetingSidebar>
			<div className='greeting__content content'></div>
			<GreetingSidebar></GreetingSidebar>		
		</div> )
	}
}
class GreetingSidebar extends React.Component {
	render(){
		return (
			<div className='greeting__sidebar content__sidebar'></div>
		)	
	}
}

export default Greeting