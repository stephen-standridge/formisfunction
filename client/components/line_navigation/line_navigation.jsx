import { Line } from './line.jsx'
import '../../styles/line_navigation'


class LineNavigationComponent extends React.Component {
	routeSlug() {
		return this.props.routeParams ? this.props.routeParams.slug : false
	}
	renderLines(){
		const { line_navigation } = this.props;
		console.warn(line_navigation)
		// if(!lines.length) return
		// return lines.map((line, lineIndex)=>{
		// 	let shouldRenderLineViewNavigation = selectedLineIndex === false;
		// 	let shouldRenderBack = selectedLineIndex === lineIndex - 1 || selectedLineIndex === lineIndex +1;
		// 	let shouldRenderView = !shouldRenderLineViewNavigation;

		// 	let className = selectedLineIndex === lineIndex ? 'active' : selectedLineIndex !== false ? 'inactive' : ''		
		// 	return <Line key={lineIndex} {...line} />
		// });		
	}
	render(){
		return <div className='line__navigation'>
			<div className='navigation__wrapper'>
				{this.renderLines()}
			</div>
		</div>
	}	
}
export { LineNavigationComponent }
