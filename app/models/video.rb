class Video < ApplicationRecord
	has_many :video_clips, dependent: :destroy
end
