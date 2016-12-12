ActiveAdmin.register View do
	permit_params :slug, :type

  index do
    selectable_column
    id_column
    column :slug
    column :type
    column :created_at
    actions
  end

  filter :type
  filter :created_at

  form do |f|
    f.inputs "Line" do
      f.input :type
      f.input :slug
    end
    f.actions
  end
end