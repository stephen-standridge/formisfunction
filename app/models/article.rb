# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  slug         :string
#  title        :string
#  body         :text
#  order        :integer
#  component_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Article < ApplicationRecord
end
