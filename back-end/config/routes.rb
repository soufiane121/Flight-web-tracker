Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
  resources :flights 

  get "/auto_login", to: "auth#auto_login"
  post "/login", to: "auth#login"
end
