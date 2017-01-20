# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  slug       :string
#  title      :string
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Article, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
