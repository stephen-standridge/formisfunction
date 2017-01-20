require 'rails_helper'

RSpec.describe "components/edit", type: :view do
  before(:each) do
    @component = assign(:component, Component.create!())
  end

  it "renders the edit component form" do
    render

    assert_select "form[action=?][method=?]", component_path(@component), "post" do
    end
  end
end
