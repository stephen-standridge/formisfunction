import ReactDOM from 'react-dom';
import React from 'react';
import Artwork from './components/Artwork';
import Documentation from './components/Documentation';
import Footer from './components/Footer';

class MainContent extends React.Component {
	render(){
		return <div className='main__wrapper'>
			<div className='main__navigation'>
				<div className='main__navigation-item'>
					artwork
				</div>
				<div className='main__navigation-item'>
					documentation
				</div>
				<div className='main__navigation-item'>
					information
				</div>
			</div>
			<div className='main__content'>
				<Artwork></Artwork>
			</div>
			<Footer section="artwork" ></Footer>			
		</div>
	}
}

ReactDOM.render(<MainContent></MainContent>, document.getElementById('app'))