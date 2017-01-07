json.extract! component, :id, :slug, :component_type, :name
json.component_options JSON.parse(component.component_options)
if component.articles.present?
	json.articles do
		json.array! component.articles.map(&:id)
	end
end
if component.audio_clips.present?
	json.audio_clips do
		json.array! component.audio_clips.map(&:id)
	end
end
if component.video_clips.present?
	json.video_clips do
		json.array! component.video_clips.map(&:id)
	end
end