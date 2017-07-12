Rails.application.routes.draw do



  get '/app' => 'pages#app'

  root 'session#root'
  get '/login' => 'session#new'
  post '/login'  => 'session#create'
  delete '/login'  => 'session#destroy'


  post '/liked' => 'posts#liked'

  resources :users

  resources :posts do
    resources :comments
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
