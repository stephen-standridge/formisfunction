import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ video_clips: [], audio_clips: [], articles: [] })

export default function update(state = initialState, action) {
	switch(action.type) {
		case COMPONENT_ACTIONS.SUCCESS:
			const { audio_clips, video_clips, articles, links, programs } = action.payload;
			audio_clips && audio_clips.forEach((audio_clip)=>{
				state = state.setIn(['audio_clips', audio_clip.id], fromJS(audio_clip))
			})
			video_clips && video_clips.forEach((video_clip)=>{
				state = state.setIn(['video_clips', video_clip.id], fromJS(video_clip))
			})
			articles && articles.forEach((article)=>{
				state = state.setIn(['articles', article.id], fromJS(article))
			})
			links && links.forEach((link)=>{
				state = state.setIn(['links', link.id], fromJS(link))
			})
			programs && programs.forEach((program)=>{
				state = state.setIn(['programs', program.id], fromJS(program))
			})
		break;
	}
  return state
}
