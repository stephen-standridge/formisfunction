module Api::V1
  class SitesController < ApiController

    # GET /v1/users
    def index
    	sites = Site.all.includes(:lines, :views, :links).first
      render json: sites, 
      	adapter: :json, 
      	serializer: SiteSerializer
    end

  end
end