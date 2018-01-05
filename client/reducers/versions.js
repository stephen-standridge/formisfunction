import { fromJS } from 'immutable';
import { VERSIONS_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ program_versions: {}, article_versions: {} });

export default function update(state = initialState, action) {
	switch(action.type) {
		case VERSIONS_ACTIONS.SUCCESS:
			const { article_versions, program_versions } = action.payload;
			article_versions && Object.keys(article_versions).forEach((article)=>{
				state = state.setIn(['article_versions', article], fromJS(article_versions[article]))
			})
			program_versions && Object.keys(program_versions).forEach((program)=>{
				state = state.setIn(['program_versions', program], fromJS(program_versions[program]))
			})
		break;
	}
  return state
}
