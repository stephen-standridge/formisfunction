json.extract! component, :id, :slug, :component_type, :title
json.options component.options.present? && JSON.parse(component.options)
if component.media.present?
	json.media do
		json.array! component.media do |medium|
			json.slug medium.slug 
			json.id medium.mediable_id
			json.type medium.mediable_type
			json.collection medium.collection

			json.order medium.order
		end
	end
end