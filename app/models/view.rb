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
	include WithLayout
	
	belongs_to :line	

	has_and_belongs_to_many :components
end
