# == Schema Information
#
# Table name: audios
#
#  id         :integer          not null, primary key
#  url        :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Audio < ApplicationRecord
	has_many :audio_clips, dependent: :destroy	
end
