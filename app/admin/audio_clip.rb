ActiveAdmin.register AudioClip do
  permit_params :slug, :start, :end, :id, :url, :title
  form do |f|
    f.inputs 'AudioClip' do
      f.input :id, as: :hidden        
      f.input :slug
      f.input :start  
      f.input :end
      f.input :title
      f.input :url
    end 
    f.actions
  end  
 end