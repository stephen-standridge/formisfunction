class Audio < ApplicationRecord
	has_many :audio_clips, dependent: :destroy	
end
