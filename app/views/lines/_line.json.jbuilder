json.extract! line, :id, :slug, :line_type
json.views do
	json.array! line.views do |view|
		json.extract! view, :id, :slug, :title
	end
end