# == Schema Information
#
# Table name: sites
#
#  id           :integer          not null, primary key
#  slug         :string
#  site_type    :string
#  site_options :json
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :site do
    
  end
end
