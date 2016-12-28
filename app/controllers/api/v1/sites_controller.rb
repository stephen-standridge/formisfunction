module Api::V1
  class SitesController < ApiController

    # GET /v1/users
    def index
    	@site = Site.all.includes(:lines, :links).first
    	render 'sites/index.json'
    end

  end
end