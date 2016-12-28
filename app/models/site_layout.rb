# == Schema Information
#
# Table name: site_layouts
#
#  id          :integer          not null, primary key
#  slug        :string
#  layout_type :string
#  site_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class SiteLayout < ApplicationRecord
	belongs_to :view
end
