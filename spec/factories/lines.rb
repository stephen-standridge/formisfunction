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

FactoryGirl.define do
  factory :line do
    slug "MyString"
    layout nil
    view nil
  end
end
