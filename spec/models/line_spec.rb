# == Schema Information
#
# Table name: lines
#
#  id         :integer          not null, primary key
#  slug       :string
#  line_type  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Line, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
