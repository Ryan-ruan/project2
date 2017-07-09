class UsersController < ApplicationController

before_action :check_if_logged_in, only: [ :edit, :update, :destroy]
before_action :check_if_admin, only: [:index]
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
    if @current_user.present?
      redirect_to user_path(@current_user)
    end
    @user = User.new
  end

  def create
    @user = User.new user_params

    if params[:file].present?
     # Then call Cloudinary's upload method, passing in the file in params
     req = Cloudinary::Uploader.upload(params[:file])
   # Using the public_id allows us to use Cloudinary's powerful image transformation methods.
     @user.avatar = req["public_id"]
    end

    @user.save


    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user.id)
    else
      render :new
    end

  end

  def edit
    redirect_to root_path unless @current_user == @user
  end

  def update

    @user = @current_user

    if params[:file].present?
      req = Cloudinary::Uploader.upload params[:file]
      @user.profile_image= req['public_id']

    end
    @user.update user_params

    redirect_to user_path(params["id"])

  end

  def destroy
    @user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :avatar, :password, :password_confirmation)
  end
end
