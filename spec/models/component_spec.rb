# == Schema Information
#
# Table name: components
#
#  id             :integer          not null, primary key
#  slug           :string
#  component_type :string
#  name           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'

RSpec.describe Component, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
