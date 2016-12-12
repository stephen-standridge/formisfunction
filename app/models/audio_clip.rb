class AudioClip < ApplicationRecord
	belongs_to :audio
	belongs_to :component
	
	accepts_nested_attributes_for :audio	
end
