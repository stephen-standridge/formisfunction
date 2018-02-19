import { connect } from 'react-redux';
import * as media_component_types from './media_types';
import { capitalize } from 'lodash';

class MediaLogic extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { slug, media, active } = this.props;
        return <div>
            { media && media.map((m, i)=>{
                let MediaOfType = media_component_types[capitalize(m.program_type || m.type)];
                return <MediaOfType slug={m.slug} key={i} active={active} />                
            })}
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    let { slug, collection } = ownProps;

    let component = state.components.get(slug);
    component = component && component.toJS();
    let media = component && component.media;
    media = media && collection && media.filter((m) => m.collection == collection);
    return { media }
}

const MediaCreator = connect(
	mapStateToProps
)(MediaLogic)

export { MediaCreator }
