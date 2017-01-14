import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ video_clips: [], audio_clips: [], articles: [] })

export default function update(state = initialState, action) {
	switch(action.type) {
		case COMPONENT_ACTIONS.SUCCESS:
			const { audio_clips, video_clips, articles, links } = action.payload;
			audio_clips && audio_clips.forEach((audio_clip)=>{
				state = state.setIn(['audio_clips', audio_clip.slug], fromJS(audio_clip))
			})
			video_clips && video_clips.forEach((video_clip)=>{
				state = state.setIn(['video_clips', video_clip.slug], fromJS(video_clip))
			})	
			articles && articles.forEach((article)=>{
				state = state.setIn(['articles', article.slug], fromJS(article))
			})	
			links && links.forEach((link)=>{
				state = state.setIn(['links', link.slug], fromJS(link))
			})				
		break;
	}
  return state
}
