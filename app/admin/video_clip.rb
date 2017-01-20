ActiveAdmin.register VideoClip do
  permit_params :slug, :start, :end, :id, :url, :title
  form do |f|
    f.inputs 'VideoClip' do
      f.input :id, as: :hidden        
      f.input :slug
      f.input :start  
      f.input :end
      f.input :url
      f.input :title
    end 
    f.actions
  end  
 end