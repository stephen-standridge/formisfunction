import { Navigation } from './navigation';
import { LineNavigation } from './line_navigation';

class LineNavigationSiteComponent extends React.Component {
	render() {
		const { component, onPrev, onNext, classNames, params } = this.props;
		console.warn(params)
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${classNames}`}>
			<div className="component__center" >
				<LineNavigation line_navigation={component.line_navigation} params={params}/>
	    	<Navigation navigation={component.navigation} params={params}/>
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }