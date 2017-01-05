module Api::V1
  class ViewsController < ApiController
    def show
    	# find by slug or id
    	param_type = params[:slug].present? ? :slug : :id
    	@view = View.find_by(param_type => params[param_type])
      @components = @view.components.includes(:audio_clips, :video_clips, :audios, :videos)
      @articles = @components.map(&:articles).flatten.compact
      @video_clips = @components.map(&:video_clips).flatten.compact
      @audio_clips = @components.map(&:audio_clips).flatten.compact
      
      render 'views/show.json'
    end    
  end
end