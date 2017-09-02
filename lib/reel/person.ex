defmodule Reel.Person do
  use Reel, :model

  schema "people" do
    field :name, :string
    field :picture, :string
    field :tmdb_id, :integer

    belongs_to :user, User

    has_many :stars_in, StarIn
    has_many :roles, through: [:stars_in, :medium]
    has_many :guest_stars, GuestStar
    has_many :guest_roles, through: [:guest_stars, :episode]
    has_many :creates, Create
    has_many :jobs, through: [:creates, :job]

    timestamps()
  end

  @doc false
  def changeset(%Person{} = person, attrs) do
    person
    |> cast(attrs, [:name, :picture, :tmdb_id, :user_id])
    |> validate_required([:name, :picture, :tmdb_id])
  end
end
