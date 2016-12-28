json.view do
	json.partial! 'views/view', view: @view
end
if @audio_clips.present?
	json.audio_clips do
		json.array! @audio_clips, partial: 'assets/audio_clip', as: :audio_clip	
	end
end

if @video_clips.present?
	json.video_clips do
		json.array! @video_clips, partial: 'assets/video_clip', as: :video_clip	
	end
end

if @articles.present?
	json.articles do
		json.array! @articles, partial: 'assets/article', as: :article	
	end
end