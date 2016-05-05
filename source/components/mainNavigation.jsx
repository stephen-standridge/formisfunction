import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

class MainNavigation extends React.Component {
	render(){
		return ( <div className='sections__navigation'>
      <Link to={`/artwork`}>
				<h4 className='sections__navigation-item'>
					artwork
				</h4>
			</Link>
      <Link to={`/documentation`}>			
				<h4 className='sections__navigation-item'>
					documentation
				</h4>
			</Link>
      <Link to={`/information`}>
				<h4 className='sections__navigation-item'>
					information
				</h4>
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