defmodule Reel.Genre do
  use Reel, :model

  schema "genres" do
    field :name, :string
    field :tmdb_id, :integer

    has_many :media_genres, MediumGenre
    has_many :media, through: [:media_genres, :medium]

    timestamps()
  end

  @doc false
  def changeset(%Genre{} = genre, attrs) do
    genre
    |> cast(attrs, [:name, :tmdb_id])
    |> validate_required([:name, :tmdb_id])
  end
end
