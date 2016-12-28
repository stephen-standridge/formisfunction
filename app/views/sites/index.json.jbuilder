json.site do
	if @site.layout 
		json.partial! 'layouts/layout', layout: @site.layout
	end
	json.lines do
		json.array! @site.lines, partial: 'lines/line', as: :line	
	end
	json.navigation do
		json.array! @site.navigation, partial: 'assets/link', as: :link	
	end
end
