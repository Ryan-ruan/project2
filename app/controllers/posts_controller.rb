class PostsController < ApplicationController
  before_action :redirect_to_https, only: :new
  before_action :check_if_logged_in, only: [:new, :create, :destroy]
  before_action :find_post, only: [:show, :destroy, :like]

  def new
    @post = Post.new
  end

  def create

    if params[:image].present?
    # upload to Cloudinary
      res = Cloudinary::Uploader.upload(params[:image])
      p = Post.create user: @current_user, image: res["public_id"]

      redirect_to post_path( p )
    end
  end




  def index
    @posts = Post.all

    respond_to do |format|
      format.html {}
      format.json {  render json: @posts }
    end
  end

  def show
    @post = Post.find params['id']
    @comments = Comment.where(post_id: @post).order("created_at DESC")

    respond_to do |format|
      format.html {}
      format.json {  render json: @post }
    end

  end

  def destroy
    @post = Post.find params['id']
    @post.destroy
    redirect_to user_path(@current_user)
  end

  # acts_as_votable
  def upvote
    @post = Post.find params['id']
    @post.upvote_from @current_user
    # redirect_to posts_path

    respond_to do |format|
      format.html { redirect_to :back}
      format.js {render layout: false}
    end
  end

  private

  def find_post
    @post = Post.find params['id']
  end

end
