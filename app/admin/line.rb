ActiveAdmin.register Line do
  permit_params :slug, :type, views_attributes: [:slug, :title, :id, :layout_id, :_destroy]

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
      row :line_type
      row :created_at
    end
    panel "Views" do
      table_for line.views do
        column :title
        column :slug
        column(:layout) { |v| v.layout.layout_type }
        column(:components) { |v| v.components.map{|c| c.name }.join(', ') }
      end
    end
  end

  form do |f|

    f.inputs "Line" do
      f.input :line_type
      f.input :slug
    end

    f.inputs "Views" do
      f.has_many :views do |view_f|      
        view_f.input :id, as: :hidden
        view_f.input :slug
        view_f.input :title  
        view_f.input :components, 
          as: :select, 
          collection: Component.all.map{|c| [c.name, c.id] }, 
          hint: "hold 'command' to select multiple",
          include_blank: false
        view_f.input :layout, 
          as: :select, 
          collection: ViewLayout.all.map {|l| [l.layout_type, l.id] }, 
          include_blank: false  
        if !view_f.object.nil?
          # show the destroy checkbox only if it already exists
          # else, there's already dynamic JS to add / remove new
          view_f.input :_destroy, :as => :boolean, :label => "Destroy?"
        end          
      end
    end

    f.actions
  end

end
