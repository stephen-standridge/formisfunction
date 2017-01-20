# == Schema Information
#
# Table name: links
#
#  id     :integer          not null, primary key
#  anchor :string           not null
#  url    :string           not null
#

class Link < ApplicationRecord
	def slug
		url.split('/').last
	end
	def title
		anchor
	end
end
