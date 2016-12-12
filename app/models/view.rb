class View < ApplicationRecord
	belongs_to :line	
	has_one :layout
	has_many :articles
	has_many :audio_clips
	has_many :video_clips
end
