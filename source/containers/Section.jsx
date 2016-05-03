import React from 'react';
import connectToStores from '../utils/connectToStores';
import {SectionSidebar, SectionFooter} from '../components/Section';
import Undefined from '../sections/Undefined';
import requireAll from '../utils/requireAll';
import DocumentTitle from 'react-document-title';

const sections = requireAll(require.context("../sections", true, /^\.\/.*\.jsx$/));


function parseSection(params) {	
  return params.section;
}

function requestData(props) {
  const { params } = props;
  const section = parseSection(section);

  // UserActionCreators.requestUser(userLogin, ['name', 'avatarUrl']);
}


// connectToStores([StarredReposByUserStore, UserStore, RepoStore], getState)
class Section extends React.Component {
  // componentWillMount() {
  //   requestData(this.props);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (parseLogin(nextProps.params) !== parseLogin(this.props.params)) {
  //     requestData(nextProps);
  //   }
  // }	
	render(){
    const section = parseSection(this.props.params);
		return <DocumentTitle title={`Form Is Function :: ${section}`}>
			<div className='main__wrapper'>		
				<div className='main__wrapper-content'> 
					<SectionSidebar section={section} ></SectionSidebar>
					<div className={`${section}__wrapper content__wrapper`}>
						{this.props.children}
					</div>
					<SectionSidebar section={section} ></SectionSidebar>		
				</div>
				<SectionFooter section={section} ></SectionFooter>									
			</div>
		</DocumentTitle>
	}
}

Section.propTypes = {
  // Injected by React Router:
  // params: React.PropTypes.shape({
  //   section: React.PropTypes.string.isRequired
  // }).isRequired,

  // Injected by connectToStores:
  // piece: React.PropTypes.object,
};

export default Section
