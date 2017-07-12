class CommentsController < ApplicationController
  before_action :find_post

  def create
    @comment = @post.comments.create(params[:comment].permit(:name, :context))

    if params[:comment][:name].present?
      @comment.name = params[:comment][:name]
      @comment.avatar = "https://api.adorable.io/avatars/100/#{@comment.name}"
    elsif @current_user.present?
      @comment.name = @current_user.name
      @comment.avatar = @current_user.avatar
    else
      @comment.name = "Anonymous"
      @comment.avatar = "https://api.adorable.io/avatars/100/anonymous.png"
    end

    @comment.save

    if @comment.save
      redirect_to post_path(@post)
    else
      render 'comments/_form'
    end
  end


  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end


  private
  def find_post
    @post = Post.find(params[:post_id])
  end

end
