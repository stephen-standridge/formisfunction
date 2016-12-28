# == Schema Information
#
# Table name: audios
#
#  id           :integer          not null, primary key
#  url          :string
#  title        :string
#  styleable_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe Audio, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
