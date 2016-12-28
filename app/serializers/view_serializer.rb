class ViewSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :layout, :component_ids

  def layout
  	object.layout.present? ? LayoutSerializer.new(object.layout) : object.layout
  end

  def component_ids
  	object.components.map(&:id)
  end
end
