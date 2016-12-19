ActiveAdmin.register Site do
  permit_params :slug, 
    lines_attributes: [:slug, :line_type, :id, :_destroy], 
    links_attributes: [:anchor, :href, :id, :_destroy]

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
      panel "Lines" do
        table_for site.lines do
          column :slug
          column :line_type
        end
      end
      panel "Navigation" do
        table_for site.links do
          column :href
          column :anchor
        end
      end 
      panel "Layout" do
        table_for site.layout do
          column :layout_type
        end
      end      
    end

  end

  form do |f|
    f.inputs "Site" do
      f.inputs "Lines" do
        f.input :lines,
          as: :select, 
          collection: Line.all.map{|l| [l.slug, l.id] }, 
          hint: "hold 'command' to select multiple",
          include_blank: false      
      end

      f.inputs "Navigation" do
        f.has_many :links do |link_f|      
          link_f.input :id, as: :hidden
          link_f.input :href
          link_f.input :anchor  
          if !link_f.object.nil?
            # show the destroy checkbox only if it already exists
            # else, there's already dynamic JS to add / remove new
            link_f.input :_destroy, :as => :boolean, :label => "Destroy?"
          end          
        end  
      end 

      f.inputs "Style" do
        f.input :layout, 
            as: :select, 
            collection: SiteLayout.all.map {|l| [l.layout_type, l.id] }, 
            include_blank: false  
      end          
      f.actions
    end
  end

end
