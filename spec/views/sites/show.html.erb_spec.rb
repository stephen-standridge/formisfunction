require 'rails_helper'

RSpec.describe "sites/show", type: :view do
  before(:each) do
    @site = assign(:site, Site.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
