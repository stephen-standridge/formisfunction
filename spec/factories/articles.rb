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

FactoryGirl.define do
  factory :article do
    
  end
end
