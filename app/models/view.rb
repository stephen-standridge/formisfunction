class View < ApplicationRecord
	belongs_to :line	
	belongs_to :layout
	has_and_belongs_to_many :components
end
