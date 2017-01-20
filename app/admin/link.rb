ActiveAdmin.register Link do
  permit_params :slug, :url, :anchor, :id
  form do |f|
    f.inputs 'Link' do
      f.input :id, as: :hidden        
      f.input :slug
      f.input :url  
      f.input :anchor
    end 
    f.actions
  end  
 end