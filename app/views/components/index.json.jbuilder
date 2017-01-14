json.component do
	json.partial! 'components/component', component: @component
end

json.partial! 'media/media', media: @media
