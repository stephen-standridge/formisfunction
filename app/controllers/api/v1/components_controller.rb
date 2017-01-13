module Api::V1
  class ComponentsController < ApiController

    def index
    	@component = Component.find_by(slug: 'site')
        render 'components/index.json'        
    end

    def show
        @component = Component.find_by(lookup_by => params[:id])
        render 'components/index.json'  
    end    

    def lookup_by
        :id if Float(params[:id]) rescue :slug
    end
  end
end