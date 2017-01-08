class Medium < ApplicationRecord
	belongs_to :component
  belongs_to :mediable, polymorphic: true	
end
