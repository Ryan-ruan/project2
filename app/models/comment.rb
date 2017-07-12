class Comment < ApplicationRecord
  belongs_to :post
  validates :context, presence: true
end
