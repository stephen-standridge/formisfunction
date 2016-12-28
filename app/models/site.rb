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
	alias_attribute :navigation, :links
	alias_attribute :layout, :site_layout
	has_and_belongs_to_many :links	
	has_and_belongs_to_many :lines
	has_one :site_layout
	has_many :views, through: :lines


	accepts_nested_attributes_for :lines, :allow_destroy => true  	
	accepts_nested_attributes_for :links, :allow_destroy => true	
end
