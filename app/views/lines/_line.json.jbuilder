json.extract! line, :id, :slug, :line_type
json.view_ids line.views.map(&:id)