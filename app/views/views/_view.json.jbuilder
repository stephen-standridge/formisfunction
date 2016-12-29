json.extract! view, :id, :slug, :title, :layout_type, 
json.layout_options view.layout_options.to_json
json.components do 
	json.array! view.components, partial: 'components/component', as: :component
end