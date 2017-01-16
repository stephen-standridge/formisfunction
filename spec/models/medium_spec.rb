# == Schema Information
#
# Table name: media
#
#  id            :integer          not null, primary key
#  order         :integer
#  for           :string
#  mediable_type :string
#  mediable_id   :integer
#  component_id  :integer
#

require 'rails_helper'

RSpec.describe Medium, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
