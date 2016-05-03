import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

class MainNavigation extends React.Component {
	render(){
		return ( <div className='sections__navigation'>
      <Link to={`/artwork`}>
				<div className='sections__navigation-item'>
					artwork
				</div>
			</Link>
      <Link to={`/documentation`}>			
				<div className='sections__navigation-item'>
					documentation
				</div>
			</Link>
      <Link to={`/information`}>
				<div className='sections__navigation-item'>
					information
				</div>
			</Link>
			</div> )
	}
}

MainNavigation.shouldComponentUpdate = shouldPureComponentUpdate;

MainNavigation.propTypes = {
  params: React.PropTypes.shape({
    section: React.PropTypes.string,
    piece: React.PropTypes.string
  })
}

export default MainNavigation