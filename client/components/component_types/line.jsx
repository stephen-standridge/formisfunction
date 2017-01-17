
class LineComponent extends React.Component {
	shouldComponentUpdate({ active, componentState }, nextState) {
		const componentStateHasChanged = this.props.componentState !== componentState;
		const hasBecomeActive = this.props.active !== active;
		return componentStateHasChanged || hasBecomeActive;
	}
	render(){
		const { active, select, slug, component, componentState } = this.props;
		console.warn(componentState)
		const className = active ? 'active' : '';
		return <div className={`line ${className}`}>
			{ active ? <div /> : <div onClick={select}>{slug}</div>}
		</div>
	}	
}
export { LineComponent }
