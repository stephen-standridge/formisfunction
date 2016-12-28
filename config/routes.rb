Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)  

  namespace :api do
    namespace :v1 do
      resources :sites
      resources :lines
    end
  end
  # resources :sites
  # resources :components

  # resources :layouts
  # resources :videos
  # resources :audios
  # resources :articles
  # resources :video_clips
  # resources :audio_clips
  # resources :views
  # resources :lines
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
