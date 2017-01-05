# == Schema Information
#
# Table name: components
#
#  id             :integer          not null, primary key
#  slug           :string
#  component_type :string
#  name           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Component < ApplicationRecord
	COMPONENT_TYPES = %w( top_to_bottom left_to_right front_to_back )	

	has_and_belongs_to_many :views, join_table: 'components_views'
	has_many :articles
	has_many :audio_clips
	has_many :video_clips
	has_many :audios, through: :audio_clips
	has_many :videos, through: :video_clips

	accepts_nested_attributes_for :articles, :allow_destroy => true
	accepts_nested_attributes_for :audio_clips, :allow_destroy => true
	accepts_nested_attributes_for :video_clips, :allow_destroy => true
end
