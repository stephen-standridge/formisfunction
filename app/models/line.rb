class Line < ApplicationRecord
  has_many :views
	has_and_belongs_to_many :sites  

	accepts_nested_attributes_for :views, :allow_destroy => true  
end
