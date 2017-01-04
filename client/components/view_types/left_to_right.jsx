class LeftToRight extends React.Component {
	renderComponents() {
		const {view} = this.props;
		if(!view.components || view.components.length <= 0 ) return <div className="components__empty" />
		return view.components.map((component,i) => <div key={i}/>)
	}
	render() {
		const { view, onPrev, onNext } = this.props;
		if(!view) return <div className="view__loading" />
		return <div className={`view__container ${view.layout_type || ""}`}>
			<div className="view__left" onClick={onPrev} >{'<'}</div>
			<div className="view__center" >
					{view.view_type}			
				{this.renderComponents()}
			</div>
			<div className="view__right" onClick={onNext} >{'>'}</div>
    </div>
	}
}

export { LeftToRight }