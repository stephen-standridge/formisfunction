class View extends React.Component {
	renderComponents() {
		const {view} = this.props;
		if(!view.components.length) return 
		return view.components.map((component,i) => <div key={i}/>)
	}
	render() {
		const { view } = this.props;
		if(!view) return <div className="view__loading" />
		return <div className={`view__container ${view.layout_type}`}>
			{this.renderComponents()}
    </div>
	}
}

export default View