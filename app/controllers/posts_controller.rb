class PostsController < ApplicationController

  before_action :check_if_logged_in, only: [:new, :create, :destroy]

  def new
  end

  def create

  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find params['id']
  end

  def destroy
    @post = Post.find params['id']
    @post.destory
    redirect_to user_path(@current_user)
  end
end
