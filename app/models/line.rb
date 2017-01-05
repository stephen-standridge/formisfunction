# == Schema Information
#
# Table name: lines
#
#  id         :integer          not null, primary key
#  slug       :string
#  line_type  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Line < ApplicationRecord
  has_many :views
	has_and_belongs_to_many :sites  

	accepts_nested_attributes_for :views, :allow_destroy => true  
end
