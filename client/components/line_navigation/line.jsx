import CSS from '../../styles/path_navigation'

class Line extends React.Component {
	renderViews(){

	}
	render(){
		console.log(this.props)
		return <div className='line__navigation'>
			{this.renderLines()}
		</div>
	}	
}
export default Line
