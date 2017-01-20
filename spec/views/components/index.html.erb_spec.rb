require 'rails_helper'

RSpec.describe "components/index", type: :view do
  before(:each) do
    assign(:components, [
      Component.create!(),
      Component.create!()
    ])
  end

  it "renders a list of components" do
    render
  end
end
