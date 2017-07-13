class SessionController < ApplicationController


  def create
    user = User.find_by email: params[:email]
    if user.present? and user.authenticate params[:password]
      session[:user_id]=user.id
      redirect_to new_post_path
    else
      flash[:error] = "Incorrect E-mail address and/or Password!"
      redirect_to login_path
    end
  end

  def new
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end

  def root
    
  end


end
