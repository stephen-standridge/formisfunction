json.extract! component, :id, :slug, :component_type, :title
json.component_options JSON.parse(component.component_options)
if component.media.present?
	json.media do
		json.array! component.media do |medium|
			json.slug medium.slug 
			json.id medium.mediable_id
			json.type medium.mediable_type
			json.for medium.for
			json.order medium.order
		end
	end
end