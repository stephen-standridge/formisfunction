ActiveAdmin.register Article do
  permit_params :slug, :title, :body, :id
  form do |f|
    f.inputs 'Article' do
      f.input :id, as: :hidden       
      f.input :slug
      f.input :title  
      f.input :body
    end 
    f.actions
  end  
 end