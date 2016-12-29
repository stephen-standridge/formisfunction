module WithLayout
  extend ActiveSupport::Concern

	LAYOUT_TYPES = %w( top_to_bottom left_to_right front_to_back )	

  module ClassMethods
		def layout_options
			layout_options ||= {}.to_json
		end	
  end
end