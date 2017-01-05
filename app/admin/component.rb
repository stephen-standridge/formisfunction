ActiveAdmin.register Component do
	permit_params :slug, :component_type, :name, 
    audio_clips_attributes: [:slug, :start, :end, :audio_id, :id, :_destroy],
    video_clips_attributes: [:slug, :start, :end, :video_id, :id, :_destroy],
    articles_attributes: [:slug, :title, :body, :id, :_destroy]

  index do
    selectable_column
    id_column
    column :slug
    column :name
    column :component_type
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
      row :created_at
    end
  end  

  form do |f|
    f.inputs "Component" do
      f.input :name      
      f.input :component_type,
        as: :select,
        collection: Component::COMPONENT_TYPES.map{ |l| [l.humanize, l] }

      f.input :slug
    end
    f.inputs "Audio Clips" do
      f.has_many :audio_clips do |audio_f|
        audio_f.input :id, as: :hidden
        audio_f.input :slug
        audio_f.input :start  
        audio_f.input :end
        audio_f.input :audio, include_blank: false

        if !audio_f.object.nil?
          # show the destroy checkbox only if it already exists
          # else, there's already dynamic JS to add / remove new
          audio_f.input :_destroy, :as => :boolean, :label => "Destroy?"
        end        
      end
    end
    f.inputs "Video Clips" do
      f.has_many :video_clips do |video_f|
        video_f.input :id, as: :hidden        
        video_f.input :slug
        video_f.input :start  
        video_f.input :end
        video_f.input :video, include_blank: false

        if !video_f.object.nil?
          # show the destroy checkbox only if it already exists
          # else, there's already dynamic JS to add / remove new
          video_f.input :_destroy, :as => :boolean, :label => "Destroy?"
        end        
      end 
    end
    f.inputs "Articles" do    
      f.has_many :articles do |article_f|
        article_f.input :id, as: :hidden       
        article_f.input :slug
        article_f.input :title  
        article_f.input :body

        if !article_f.object.nil?
          # show the destroy checkbox only if it already exists
          # else, there's already dynamic JS to add / remove new
          article_f.input :_destroy, :as => :boolean, :label => "Destroy?"
        end        
      end
    end
    f.actions
  end
end