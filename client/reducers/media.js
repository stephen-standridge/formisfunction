import { fromJS } from 'immutable';
import { VIEW_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ video_clips: [], audio_clips: [], articles: [] })

export default function update(state = initialState, action) {
	switch(action.type) {
		case VIEW_ACTIONS.SUCCESS:
			action.payload.audio_clips.forEach((audio_clip)=>{
				state = state.setIn(['audio_clips', audio_clip.id], fromJS(audio_clip))
			})
			action.payload.video_clips.forEach((video_clip)=>{
				state = state.setIn(['video_clips', video_clip.id], fromJS(video_clip))
			})	
			action.payload.articles.forEach((article)=>{
				state = state.setIn(['articles', article.id], fromJS(article))
			})	
		break;
	}
  return state
}
