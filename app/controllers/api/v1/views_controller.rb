module Api::V1
  class ViewsController < ApiController
    def show
    	# find by slug or id
    	param_type = params[:slug].present? ? :slug : :id
    	@view = View.find_by(param_type => params[param_type])
      @components = @view.components.includes(:media, :audio_clips, :video_clips, :articles)
      @media = @components.map(&:media).flatten.compact
      
      render 'views/show.json'
    end    
  end
end