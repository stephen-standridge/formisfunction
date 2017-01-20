require 'rails_helper'

RSpec.describe "sites/index", type: :view do
  before(:each) do
    assign(:sites, [
      Site.create!(),
      Site.create!()
    ])
  end

  it "renders a list of sites" do
    render
  end
end
