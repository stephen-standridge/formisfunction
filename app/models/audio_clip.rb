# == Schema Information
#
# Table name: audio_clips
#
#  id           :integer          not null, primary key
#  slug         :string
#  order        :integer
#  start        :time
#  end          :time
#  component_id :integer
#  audio_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AudioClip < ApplicationRecord
	belongs_to :audio
	has_many :media, as: :medium
	
	accepts_nested_attributes_for :audio	
  def method_missing(name, *args, &block)
  	nil
  end	
end
