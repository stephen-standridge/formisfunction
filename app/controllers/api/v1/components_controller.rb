module Api::V1
  class ComponentsController < ApiController

    # GET /v1/users
    def index
    	components = Component.all.includes(:audio_clips, :video_clips)
    end

    def show
    	# find by slug or id
    	param_type = component_params[:slug].present? ? :slug : :id
    	component = Component.find_by(param_type => component_params[param_type])
    												.includes(:audio_clips, :video_clips)
    end    

    def component_params
    	params.require(:component).permit(:id, :slug)
    end

  end
end