json.video_clips do
	json.array! media.select{|m| m.mediable_type == 'VideoClip'}, partial: 'media/medium', as: :medium
end

json.audio_clips do
	json.array! media.select{|m| m.mediable_type == 'AudioClip'}, partial: 'media/medium', as: :medium
end

json.articles do
	json.array! media.select{|m| m.mediable_type == 'Article'}, partial: 'media/medium', as: :medium
end

json.links do
	json.array! media.select{|m| m.mediable_type == 'Link'}, partial: 'media/medium', as: :medium
end