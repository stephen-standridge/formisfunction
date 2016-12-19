# == Schema Information
#
# Table name: audio_clips
#
#  id           :integer          not null, primary key
#  slug         :string
#  order        :integer
#  start        :time
#  end          :time
#  component_id :integer
#  audio_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe AudioClip, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
