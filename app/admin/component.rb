ActiveAdmin.register Component do
	permit_params :slug, :name, :component_options, :component_type, 
  media_attributes: [ :id, :mediable_identifier, :_destroy ]

  index do
    selectable_column
    id_column
    column :slug
    column :name
    column :component_type
    column :component_options
    column :created_at
    actions
  end

  filter :component_type
  filter :name
  filter :created_at

  show do
    attributes_table do
      row :slug
      row :name
      row :component_type
      row :component_options
      row :created_at
    end
  end  

  form do |f|
    f.inputs "Component" do
      f.input :name      
      f.input :component_type,
        as: :select,
        collection: Component::COMPONENT_TYPES.map{ |l| [l.humanize, l] }
      f.input :component_options, 
          as: :text 
      f.input :slug
    end
    f.has_many :media do |media_f| 
      media_f.input :mediable_identifier, collection: (Component.all + Article.all + VideoClip.all + AudioClip.all).map { |i| [ i.slug, "#{i.class.to_s}-#{i.id}"] }
      if !media_f.object.nil?
        # show the destroy checkbox only if it already exists
        # else, there's already dynamic JS to add / remove new
        media_f.input :_destroy, :as => :boolean, :label => "Destroy?"
      end         
    end
    f.actions
  end
end