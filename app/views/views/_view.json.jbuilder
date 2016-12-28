json.extract! view, :id, :slug, :title
if view.layout 
	json.partial! 'layouts/layout', layout: view.layout
end
json.components do 
	json.array! view.components, partial: 'components/component', as: :component
end