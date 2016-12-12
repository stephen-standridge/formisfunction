ActiveAdmin.register Line do
  permit_params :slug, :type, views_attributes: [:slug, :title, :id]

  controller do

    def scoped_collection
      Line.includes(:views)
    end
  end

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

    f.inputs "Views" do
      f.has_many :views do |view_f|
        if !view_f.object.nil?
          # show the destroy checkbox only if it is an existing appointment
          # else, there's already dynamic JS to add / remove new appointments
          view_f.input :_destroy, :as => :boolean, :label => "Destroy?"
        end

        view_f.input :slug
        view_f.input :title        
      end
    end

    f.actions
  end

end
