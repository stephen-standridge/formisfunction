import { Navigation } from './navigation';

class LineNavigationSiteComponent extends React.Component {
	render() {
		const { component, onPrev, onNext, classNames } = this.props;
		console.warn(component)		
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${classNames}`}>
			<div className="component__center" >
	    	<Navigation navigation={component.navigation} />
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }