defmodule Reel.MediumGenre do
  use Reel, :model

  schema "media_genres" do
    belongs_to :genre, Genre
    belongs_to :medium, Medium

    timestamps()
  end

  @doc false
  def changeset(%MediumGenre{} = medium_genre, attrs) do
    medium_genre
    |> cast(attrs, [:medium_id, :genre_id])
    |> validate_required([:medium_id, :genre_id])
  end
end
