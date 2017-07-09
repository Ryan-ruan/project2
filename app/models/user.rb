class User < ApplicationRecord
has_many :posts
has_many :comments
has_secure_password

validates :email, presence: true, uniqueness: true, length: {minimum: 5}
validates :name, presence: true

end
