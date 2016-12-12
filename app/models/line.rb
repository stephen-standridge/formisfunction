class Line < ApplicationRecord
  has_many :views
	accepts_nested_attributes_for :views  
end
