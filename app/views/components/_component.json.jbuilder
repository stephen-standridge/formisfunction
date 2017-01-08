json.extract! component, :id, :slug, :component_type, :name
json.component_options JSON.parse(component.component_options)
if component.media.present?
	json.media do
		json.array! component.media do |medium|
			json.id medium.mediable_id
			json.type medium.mediable_type
		end
	end
end