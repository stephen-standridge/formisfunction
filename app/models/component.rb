class Component < ApplicationRecord
	has_and_belongs_to_many :views
	has_many :articles
	has_many :audio_clips
	has_many :video_clips
	has_many :audios, through: :audio_clips
	has_many :videos, through: :video_clips

	accepts_nested_attributes_for :articles, :allow_destroy => true
	accepts_nested_attributes_for :audio_clips, :allow_destroy => true
	accepts_nested_attributes_for :video_clips, :allow_destroy => true
end
