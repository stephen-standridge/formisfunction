json.views do
	json.array! @views, partial: 'views/view', as: :view
end
json.audio_clips do
	json.array! @audio_clips, partial: 'assets/audio_clip', as: :audio_clip	
end

json.video_clips do
	json.array! @video_clips, partial: 'assets/video_ciip', as: :video_ciip	
end

json.articles do
	json.array! @articles, partial: 'assets/article', as: :article	
end