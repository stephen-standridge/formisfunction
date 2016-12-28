class SiteSerializer < ActiveModel::Serializer
  has_one :layout, serializer: LayoutSerializer
  has_many :links, serializer: LinkSerializer
  has_many :lines, serializer: LineSerializer
  has_many :views, serializer: ViewSerializer
end
