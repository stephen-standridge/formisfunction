json.extract! view, :id, :slug, :title
json.extract! view, :layout_type, :layout_options
json.components do 
	json.array! view.components, partial: 'components/component', as: :component
end