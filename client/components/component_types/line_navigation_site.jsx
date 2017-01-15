import { Navigation } from '../navigation';
import { LineNavigation } from '../line_navigation';

class LineNavigationSiteComponent extends React.Component {
	render() {
		const { component, onPrev, onNext, classNames, slug, param } = this.props;
		console.warn(param)
		if(!component) return <div className="component__loading" />
		return <div className={`component__container ${classNames}`}>
			<div className="component__center" >
				<LineNavigation line_navigation={component.line_navigation} param={param}/>
	    	<Navigation navigation={component.navigation} param={param}/>
			</div>
    </div>
	}
}

export { LineNavigationSiteComponent }