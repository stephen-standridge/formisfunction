class Site < ApplicationRecord
	has_and_belongs_to_many :lines
	
	accepts_nested_attributes_for :lines, :allow_destroy => true  	
end
