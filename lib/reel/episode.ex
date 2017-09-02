defmodule Reel.Episode do
  use Reel, :model

  schema "episodes" do
    field :air_date, :date
    field :episode_number, :integer
    field :name, :string
    field :overview, :string
    field :production_code, :string
    field :season_number, :integer
    field :tmdb_average, :float
    field :tmdb_vote_count, :integer

    belongs_to :season, Season

    has_many :extra_credits, GuestStar
    has_many :guest_stars, through: [:extra_credits, :person]

    timestamps()
  end

  @doc false
  def changeset(%Episode{} = episode, attrs) do
    episode
    |> cast(attrs, [:air_date, :episode_number, :name, :overview, :production_code, :season_number, :tmdb_average, :tmdb_vote_count, :season_id])
    |> validate_required([:air_date, :episode_number, :name, :overview, :production_code, :season_number, :tmdb_average, :tmdb_vote_count, :season_id])
  end
end
