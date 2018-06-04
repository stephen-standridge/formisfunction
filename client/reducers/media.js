import { fromJS } from 'immutable';
import { MEDIA_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ links: {}, programs: {}, articles: {} })

export default function update(state = initialState, action) {
	const { type, meta, payload } = action;

	switch(type) {
		case MEDIA_ACTIONS.SUCCESS:
			const { articles, links, programs, dates } = payload;
			articles && articles.forEach((article)=>{
				state = state.setIn(['articles', article.slug], fromJS(article))
			});
			links && links.forEach((link)=>{
				state = state.setIn(['links', link.slug], fromJS(link))
			});
			dates && dates.forEach((date)=>{
				state = state.setIn(['dates', date.slug], fromJS(date))
			});
			programs && programs.forEach((program)=>{
				state = state.setIn(['programs', program.slug], fromJS(program))
			});
		break;
	}
  return state
}
