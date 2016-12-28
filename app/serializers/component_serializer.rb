class ComponentSerializer < ActiveModel::Serializer
  attributes :id, :slug, :component_type, :name	
end
