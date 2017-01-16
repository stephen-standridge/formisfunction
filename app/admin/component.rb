ActiveAdmin.register Component do
	permit_params :slug, :title, :options, :component_type, 
  media_attributes: [ :id, :order, :state, :mediable_identifier, :_destroy ]

  index do
    selectable_column
    id_column
    column :slug
    column :title
    column :component_type
    column :options
    column(:media) { |component| component.media.map{|m| "#{m.mediable_type}: #{m.title}" } }
    column :created_at
    actions
  end

  filter :component_type
  filter :title

  show do
    attributes_table_for component do
      row :slug
      row :title
      row :component_type
      row :options
      row "Media" do
        component.media.each do |media|
          url_generator = "admin_#{media.mediable_type.underscore}_path".to_sym
          a "#{media.mediable_type}: #{media.title}", href: send(url_generator, media.mediable_id)          
          text_node "&nbsp".html_safe
        end 
        nil       
      end
      row :created_at
    end
  end  

  form do |f|
    f.inputs "Component" do
      f.input :title      
      f.input :component_type,
        as: :select,
        collection: Component::COMPONENT_TYPES.map{ |l| [l.humanize, l] }
      f.input :options, 
          as: :text 
      f.input :slug
    end
    f.has_many :media do |media_f| 
      media_f.input :mediable_identifier, collection: (Link.all + Component.all + Article.all + VideoClip.all + AudioClip.all).map { |i| [ i.slug, "#{i.class.to_s}-#{i.id}"] }
      if !media_f.object.nil?
        # show the destroy checkbox only if it already exists
        # else, there's already dynamic JS to add / remove new
        media_f.input :_destroy, :as => :boolean, :label => "Destroy?"
      end
      media_f.input :for      
    end
    f.actions
  end
end