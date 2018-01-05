import { fromJS } from 'immutable';
import { MEDIA_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ links: {}, programs: {}, articles: {} })

export default function update(state = initialState, action) {
	switch(action.type) {
		case MEDIA_ACTIONS.SUCCESS:
			const { articles, links, programs } = action.payload;
			articles && articles.forEach((article)=>{
				state = state.setIn(['articles', article.slug], fromJS(article))
			})
			links && links.forEach((link)=>{
				state = state.setIn(['links', link.slug], fromJS(link))
			})
			programs && programs.forEach((program)=>{
				state = state.setIn(['programs', program.slug], fromJS(program))
			})
		break;
	}
  return state
}
