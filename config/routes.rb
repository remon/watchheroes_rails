Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :heroes
    end
  end
  root "pages#index"
  get "*path", to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
