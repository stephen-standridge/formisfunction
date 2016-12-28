module Api::V1
  class LinesController < ApiController

    # GET /v1/users
    def index
      render json: Line.all
    end

  end
end