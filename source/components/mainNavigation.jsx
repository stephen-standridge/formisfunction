import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';

class MainNavigation extends React.Component {
	render(){
		return ( <div className='sections__navigation'>
      <Link to={`/artwork`}>
				<h5 className='sections__navigation-item strong'>
					artwork
				</h5>
			</Link>
      <Link to={`/documentation`}>			
				<h5 className='sections__navigation-item strong'>
					documentation
				</h5>
			</Link>
      <Link to={`/information`}>
				<h5 className='sections__navigation-item strong'>
					information
				</h5>
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