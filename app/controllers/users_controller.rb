class UsersController < ApplicationController

before_action :get_user, only: [:show, :edit, :update]

  def get_user
    @user = User.find params["id"]
  end

  def index
    @users = User.all
  end

  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
  end

  def edit
    redirect_to root_path unless @current_user == @user
  end

  def update

    @user = @current_user
    @user.update user_params

    redirect_to user_path(params["id"])

  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :avatar, :password, :password_confirmation)
  end
end
