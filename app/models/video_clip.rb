# == Schema Information
#
# Table name: video_clips
#
#  id           :integer          not null, primary key
#  slug         :string
#  order        :integer
#  start        :time
#  end          :time
#  component_id :integer
#  video_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class VideoClip < ApplicationRecord
	belongs_to :video
	has_many :media, as: :medium

	accepts_nested_attributes_for :video
  def method_missing(name, *args, &block)
  	nil
  end	
end
