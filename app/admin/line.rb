ActiveAdmin.register Line do
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

  show do
    attributes_table do
      row :slug
      row :type
      row :created_at
    end
    panel "Views" do
      table_for line.views do
        column :title
        column :slug
      end
    end
    active_admin_comments
  end
  form do |f|
    f.inputs "Line" do
      f.input :type
      f.input :slug
    end
    f.actions
  end

end
