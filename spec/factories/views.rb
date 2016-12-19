# == Schema Information
#
# Table name: views
#
#  id         :integer          not null, primary key
#  slug       :string
#  title      :string
#  line_id    :integer
#  layout_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :view do
    slug "MyString"
  end
end
