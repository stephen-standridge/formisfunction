require 'rails_helper'

RSpec.describe "Components", type: :request do
  describe "GET /components" do
    it "works! (now write some real specs)" do
      get components_path
      expect(response).to have_http_status(200)
    end
  end
end
