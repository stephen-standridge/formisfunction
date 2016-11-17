import CSS from '../../styles/path_navigation'

class PathNav extends React.Component {
	choosePath(index){
		console.log(index)
	}
	render(){
		return <div className='path__navigation'>
			{this.props.children}
		</div>
	}	
}
export default PathNav