class DefaultComponent extends ViewBase {
	render() {
		const { component, onPrev, onNext } = this.props;
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${component.component_type || ""}`}>
			<div className="component__left" onClick={onPrev} >{'<'}</div>
			<div className="component__center" >
					{component.component_type}
				{this.renderComponents()}
			</div>
			<div className="component__right" onClick={onNext} >{'>'}</div>
    </div>
	}
}

export { DefaultComponent }