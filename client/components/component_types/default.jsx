class DefaultComponent extends React.Component {
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		return <div className={`component__container ${classNames}`}>
			<div className="component__center" >
				{component.component_type}
				{this.props.children}
			</div>
    </div>
	}
}

export { DefaultComponent }