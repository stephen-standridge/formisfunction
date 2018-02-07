import { connect } from 'react-redux';
import moment from 'moment';
import './date.scss'

class DateMedia extends React.Component {
	constructor(props){
		super(props);
		this.state = { active: {} };
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `date__${part} ${classNames && classNames[part] || ''} ${active[part] ? 'active' : ''}`
	}
	render(){
		const { date, classNames, children } = this.props;
		if (!date) return <div className={this.classNamesFor('not_found')} />
		const { title, body } = date;
		return <div className={`${this.classNamesFor('wrapper')}`}>
			{ title && <div className={`lato large wide dark dark_color ${this.classNamesFor('title')}`}>
				{ title }
			</div> }
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const date = state.media.getIn(['dates', ownProps.slug]);
  return { date: date && date.toJS() };
}

const Date = connect(
	mapStateToProps
)(DateMedia)

export {Date}
