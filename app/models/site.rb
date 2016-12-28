# == Schema Information
#
# Table name: sites
#
#  id         :integer          not null, primary key
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Site < ApplicationRecord
	LAYOUT_TYPES = %w( top_to_bottom left_to_right front_to_back )	
	alias_attribute :navigation, :links
	has_and_belongs_to_many :links	
	has_and_belongs_to_many :lines
	has_many :views, through: :lines

	accepts_nested_attributes_for :lines, :allow_destroy => true  	
	accepts_nested_attributes_for :links, :allow_destroy => true	
	
	def options
		options ||= {}
	end	
end
