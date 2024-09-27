class Project < ApplicationRecord
    has_many :members, through: :project_members
    has_many :project_members

    validates :title, :description, presence: true
end
