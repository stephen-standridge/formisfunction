json.site do
	json.extract! @site, :site_type
	json.site_options JSON.parse(@site.site_options)
	json.lines do
		json.array! @site.lines, partial: 'lines/line', as: :line	
	end
	json.navigation do
		json.array! @site.navigation, partial: 'assets/link', as: :link	
	end
end
