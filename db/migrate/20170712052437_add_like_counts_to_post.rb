class AddLikeCountsToPost < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :like_counts, :integer
  end
end
