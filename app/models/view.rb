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
	VIEW_TYPES = %w( default )	

	belongs_to :line	

	has_and_belongs_to_many :components, join_table: 'components_views'
end
