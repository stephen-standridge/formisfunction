# == Schema Information
#
# Table name: videos
#
#  id         :integer          not null, primary key
#  url        :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Video < ApplicationRecord
	has_many :video_clips, dependent: :destroy
end
