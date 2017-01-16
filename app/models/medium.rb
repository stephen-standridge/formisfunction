# == Schema Information
#
# Table name: media
#
#  id            :integer          not null, primary key
#  order         :integer
#  for           :string
#  mediable_type :string
#  mediable_id   :integer
#  component_id  :integer
#

class Medium < ApplicationRecord
	MEDIABLE_TYPES = %w(Article VideoClip AudioClip Component Link)
	delegate :title, :start, :end, :slug, :body, :url, :anchor, :component_type, :options, to: :mediable
  
	belongs_to :component
  belongs_to :mediable, polymorphic: true	

	validates :mediable, presence: true

  attr_accessor :mediable_identifier

  def mediable_identifier
    "#{mediable.class.to_s}-#{mediable.id}" if mediable
  end

  def mediable_identifier=(mediable_data)
    if mediable_data.present?
      mediable_data = mediable_data.split('-')
      self.mediable_type = mediable_data[0]
      self.mediable_id = mediable_data[1]
    end
  end

	def build_mediable(params)
    raise "Unknown mediable_type: #{mediable_type}" unless MEDIABLE_TYPES.include?(mediable_type)
    self.mediable = mediable_type.constantize.new(params)
  end 
	accepts_nested_attributes_for :mediable	

end
