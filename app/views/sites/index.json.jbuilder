json.site do
	json.extract! @site, :layout_type
	json.layout_options JSON.parse(@site.layout_options)
	json.lines do
		json.array! @site.lines, partial: 'lines/line', as: :line	
	end
	json.navigation do
		json.array! @site.navigation, partial: 'assets/link', as: :link	
	end
end
