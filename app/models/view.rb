# == Schema Information
#
# Table name: views
#
#  id         :integer          not null, primary key
#  slug       :string
#  title      :string
#  line_id    :integer
#  layout_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class View < ApplicationRecord
	alias_attribute :layout, :view_layout
	belongs_to :line	
	has_one :view_layout
	has_and_belongs_to_many :components
end
