# == Schema Information
#
# Table name: components
#
#  id                :integer          not null, primary key
#  slug              :string
#  component_type    :string
#  component_options :json
#  name              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

FactoryGirl.define do
  factory :component do
    
  end
end
