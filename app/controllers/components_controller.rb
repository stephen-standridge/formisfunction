class ComponentsController < InheritedResources::Base

  private

    def component_params
      params.require(:component).permit()
    end
end

