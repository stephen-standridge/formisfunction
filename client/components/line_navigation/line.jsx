class Line extends React.Component {
	renderViews() {
		return
	// 	return line.views.map((view, viewIndex)=>{
	// 		let isView = this.routeSlug() == view.slug;
	// 		let isFirst = this.routeSlug() == undefined && viewIndex == 0;
	// 		return isFirst || isView  ? 
	// 			<View {...view}
	// 				key={`${lineIndex}.${viewIndex}`}				
	// 				onPrev={this.props.changeView.bind(this, -1)} 
	// 				onNext={this.props.changeView.bind(this, 1)}/> :
	// 			null
	// 	})
	// 	line.views.map((view, viewIndex)=>{
	// 		return selectedViewIndex === viewIndex ? 
	// 			<Link key={`${lineIndex}.${viewIndex}`} className='line__link' to={view.slug} >{view.title}</Link> :
	// 			null
	// 	})
	// 	line.views.map((view, viewIndex)=>{
	// 			return selectedViewIndex === viewIndex ? 
	// 				<Link key={`${lineIndex}.${viewIndex}`} className='line__link' to={view.slug} >{view.title}</Link> :
	// 				null
	// 		})			
	}	
	render(){
		return <div className={`line ${className}`}>
		</div>
	}	
}
export { Line }
