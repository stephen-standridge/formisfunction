ActiveAdmin.register Line do
  controller do
    def scoped_collection
      Line.includes(:views)
    end
    def permitted_params
      params.permit!
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
        column :view_type
        column :view_options
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
        view_f.input :view_type,
          as: :select,
          collection: View::VIEW_TYPES.map{ |l| [l.humanize, l] }
        view_f.input :view_options, 
          as: :text         
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
