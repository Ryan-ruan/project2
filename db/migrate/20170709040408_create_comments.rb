class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :name
      t.text :avatar
      t.text :context
      t.integer :user_id
      t.integer :post_id

      t.timestamps
    end
  end
end
