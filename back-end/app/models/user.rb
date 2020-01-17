class User < ApplicationRecord
    has_many :flights

    validates :user_name, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password_digest, presence: true, length: {minimum: 3}

    has_secure_password
end
