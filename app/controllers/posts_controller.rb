class PostsController < ApplicationController

  before_action :check_if_logged_in, only: [:new, :create, :destroy]

  def new
    @post = Post.new
  end

  def create

  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find params['id']
    @comments = Comment.where(post_id: @post).order("created_at DESC")
  end

  def destroy
    @post = Post.find params['id']
    @post.destory
    redirect_to user_path(@current_user)
  end
end
