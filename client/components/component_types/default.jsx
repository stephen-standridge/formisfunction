class DefaultComponent extends React.Component {
	render() {
				console.warn('hello')

		const { component, onPrev, onNext, classNames } = this.props;
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${classNames}`}>
			<div className="component__center" >
				{component.component_type}
				{this.props.children}
			</div>
    </div>
	}
}

export { DefaultComponent }