require 'rails_helper'

RSpec.describe "sites/new", type: :view do
  before(:each) do
    assign(:site, Site.new())
  end

  it "renders new site form" do
    render

    assert_select "form[action=?][method=?]", sites_path, "post" do
    end
  end
end
