import ReactDOM from 'react-dom';
import React from 'react';

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
				<div className='artwork__wrapper'>
					<div className='artwork__content'>
					</div>
					<div className='artwork__navigation'>
					</div>
				</div>
			</div>
		</div>
	}
}

ReactDOM.render(<MainContent></MainContent>, document.getElementById('app'))