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

FactoryGirl.define do
  factory :medium do
    
  end
end
