json.extract! medium, :slug
json.id medium.mediable_id

if medium.mediable_type == 'Article'	
	json.extract! medium, :title, :body
end
if medium.mediable_type == 'VideoClip'
	json.extract! medium, :start, :end, :url, :title
end
if medium.mediable_type == 'AudioClip'
	json.extract! medium, :start, :end, :url, :title
end
if medium.mediable_type == 'Link'
	json.extract! medium, :url, :anchor
end
if medium.mediable_type == 'Component'
	json.extract! medium, :component_type, :title
	if medium.component_options.present?
		json.component_options JSON.parse(medium.component_options)
	end
end

