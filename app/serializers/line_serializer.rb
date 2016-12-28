class LineSerializer < ActiveModel::Serializer
  attributes :id, :line_type, :slug, :view_ids

  def view_ids
  	object.views.map(&:id)
  end
end
