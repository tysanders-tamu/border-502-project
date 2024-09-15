require 'date'

class Member < ApplicationRecord
    has_many :project, through: :project_members
    has_many :project_members

    before_validation :set_default_values, on: :create

    validates :uin, presence: true, uniqueness: true
    validates :name, :major, :year, :phone, :aggie_ring_day, :birthday, :graduation_day, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :tshirt_size, presence: true, inclusion: { in: %w(XS S M L XL XXL), message: "%{value} is not a valid size" }

    def set_default_values
        self.archived ||= false
        self.accepted ||= false
        self.join_date ||= Date.today
        self.paid_dues ||= false
        self.role ||= "member"
    end
end
