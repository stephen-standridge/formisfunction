ActiveAdmin.register Site do
  permit_params :slug, lines_attributes: [:slug, :line_type, :id]

  controller do
    def scoped_collection
      Site.includes(:lines)
    end
  end

  index do
    selectable_column
    id_column
    column :slug
    column :created_at
    actions
  end

  filter :slug

  show do
    attributes_table do
      row :slug
      row :created_at
    end
    panel "Lines" do
      table_for site.lines do
        column :slug
        column :line_type
      end
    end
  end

  form do |f|

    f.inputs "Line" do
      f.input :lines,
        as: :select, 
        collection: Line.all.map{|l| [l.slug, l.id] }, 
        hint: "hold 'command' to select multiple",
        include_blank: false      
    end
    f.actions
  end

end
