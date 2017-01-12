# == Schema Information
#
# Table name: video_clips
#
#  id           :integer          not null, primary key
#  slug         :string
#  order        :integer
#  start        :time
#  end          :time
#  component_id :integer
#  video_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class VideoClip < ApplicationRecord
end
