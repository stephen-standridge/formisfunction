ActiveAdmin.register Medium do
  permit_params :mediable_type, :mediable_id, :mediable, mediable_attributes: [
    :slug, :title, :body, :start, :end, :audio_id, :video_id, :id, :_destroy
  ]
  form do |f|
    f.inputs 'Type' do
      f.input :mediable_type, input_html: {class: 'polyselect'},
        collection: Medium::MEDIABLE_TYPES
    end    
    f.inputs 'Article', for: [:mediable, f.object.mediable || Article.new],
         id: 'Article_poly', class: 'inputs polyform' do |article_f|
      article_f.input :id, as: :hidden       
      article_f.input :slug
      article_f.input :title  
      article_f.input :body
    end 

    f.inputs 'Video Clip', for: [:mediable, f.object.mediable || VideoClip.new],
       id: 'VideoClip_poly', class: 'inputs polyform' do |video_f|
      video_f.input :id, as: :hidden        
      video_f.input :slug
      video_f.input :start  
      video_f.input :end
      video_f.input :video, include_blank: false
    end  

    f.inputs 'Audio Clip', for: [:mediable, f.object.mediable || AudioClip.new],
       id: 'AudioClip_poly', class: 'inputs polyform' do |audio_f|
      audio_f.input :id, as: :hidden        
      audio_f.input :slug
      audio_f.input :start  
      audio_f.input :end
      audio_f.input :audio, include_blank: false
    end 
    f.actions
  end

   controller do
     def create
       @medium = Medium.new permitted_params[:medium]
       if @medium.save
         redirect_to collection_path
       end
     end
   end
 end