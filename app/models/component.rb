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

class Component < ApplicationRecord
	COMPONENT_TYPES = %w( one_by_n_video n_by_one_video one_by_n_audio n_by_one_audio one_by_n_article n_by_one_article )	

 	has_many :media

	has_many :audio_clips, through: :media,
	         source: :mediable, source_type: 'AudioClip'

	has_many :video_clips, through: :media,
           source: :mediable, source_type: 'VideoClip'

	has_many :articles, through: :media,
           source: :mediable, source_type: 'Article'  

	has_many :links, through: :media,
           source: :mediable, source_type: 'Link'      

	has_many :components, through: :media,
           source: :mediable, source_type: 'Component'                                 

	accepts_nested_attributes_for :media, :allow_destroy => true	
end
