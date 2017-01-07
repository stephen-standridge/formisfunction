class DefaultView extends React.Component {
	render() {
		const { view, onPrev, onNext, classNames} = this.props;
		if(!view) return <div className="view__loading" />
		return <div className={`view__container ${ classNames }`}>
			<div className="view__left" onClick={onPrev} >{'<'}</div>
			<div className="view__center" >
				{view.view_type}
				{this.props.children}
			</div>
			<div className="view__right" onClick={onNext} >{'>'}</div>
    </div>
	}
}

export { DefaultView }