# == Schema Information
#
# Table name: audio_clips
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

class AudioClip < ApplicationRecord
	
end
