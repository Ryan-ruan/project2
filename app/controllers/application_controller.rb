class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :fetch_user

  private
  def fetch_user
    @current_user = User.find_by id:session[:user_id] if session[:user_id].present?
    session[:user_id]=nil unless @current_user.present?
  end

  def check_if_logged_in
    redirect_to login_path unless @current_user.present?
  end

  def check_if_admin
    redirect_to login_path unless @current_user.present? && @current_user.is_admin?
  end

  def redirect_to_https
    redirect_to :protocol => "https://" unless (request.ssl? || request.local?)
  end


end
