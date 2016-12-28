json.extract! component, :id, :slug, :component_type, :name
if component.articles.present?
	json.article_ids do
		json.array! component.articles.map(&:id)
	end
end
if component.audio_clips.present?
	json.audio_clip_ids do
		json.array! component.audio_clips.map(&:id)
	end
end
if component.video_clips.present?
	json.video_clip_ids do
		json.array! component.video_clips.map(&:id)
	end
end