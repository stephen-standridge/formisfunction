json.views do
	json.array! [@view], partial: 'views/view', as: :view
end

json.partial! 'media/media', media: @media

