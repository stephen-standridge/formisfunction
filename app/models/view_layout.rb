# == Schema Information
#
# Table name: view_layouts
#
#  id          :integer          not null, primary key
#  slug        :string
#  layout_type :string
#  view_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ViewLayout < ApplicationRecord
	belongs_to :view
end
