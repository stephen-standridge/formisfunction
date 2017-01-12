# == Schema Information
#
# Table name: video_clips
#
#  id         :integer          not null, primary key
#  slug       :string
#  start      :time
#  end        :time
#  url        :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :video_clip do
    
  end
end
