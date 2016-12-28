# == Schema Information
#
# Table name: views
#
#  id         :integer          not null, primary key
#  line_id    :integer
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class View < ApplicationRecord
	LAYOUT_TYPES = %w( top_to_bottom left_to_right front_to_back )	
	belongs_to :line	

	has_and_belongs_to_many :components
	def options
		options ||= {}
	end	
end
