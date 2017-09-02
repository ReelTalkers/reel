defmodule Reel.Collection do
  use Reel, :model

  schema "collections" do
    field :backdrop, :string
    field :name, :string
    field :overview, :string
    field :poster, :string
    field :tmdb_id, :integer

    has_many :movies, Movie

    timestamps()
  end

  @doc false
  def changeset(%Collection{} = collection, attrs) do
    collection
    |> cast(attrs, [:backdrop, :name, :overview, :poster, :tmdb_id])
    |> validate_required([:backdrop, :name, :overview, :poster, :tmdb_id])
  end
end
