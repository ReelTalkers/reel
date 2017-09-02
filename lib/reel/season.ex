defmodule Reel.Season do
  use Reel, :model

  schema "seasons" do
    field :air_date, :date
    field :name, :string
    field :overview, :string
    field :poster, :string
    field :season_number, :integer
    field :tmdb_id, :integer

    belongs_to :show, Show
    has_many :episodes, Episode

    timestamps()
  end

  @doc false
  def changeset(%Season{} = season, attrs) do
    season
    |> cast(attrs, [:air_date, :name, :overview, :poster, :season_number, :tmdb_id, :show_id])
    |> validate_required([:air_date, :name, :overview, :poster, :season_number, :tmdb_id, :show_id])
  end
end
