json.views do
	json.array! @views, partial: 'views/view', as: :view
end

json.partial! 'media/media', media: @media
