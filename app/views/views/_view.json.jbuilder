json.extract! view, :id, :slug, :title, :view_type

json.view_options JSON.parse(view.view_options)
json.components do 
	json.array! view.components, partial: 'components/component', as: :component
end