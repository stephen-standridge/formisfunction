class VideoClip < ApplicationRecord
	belongs_to :video
	belongs_to :component	

	accepts_nested_attributes_for :video
end
