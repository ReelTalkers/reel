defmodule Reel.Movie do
  use Reel, :model

  schema "movies" do
    field :adult, :boolean, default: false
    field :imdb_id, :string
    field :release_date, :date
    field :runtime, :integer
    field :tagline, :string
    field :video, :boolean, default: false

    belongs_to :collection, Collection
    belongs_to :medium, Medium

    timestamps()
  end

  @doc false
  def changeset(%Movie{} = movie, attrs) do
    movie
    |> cast(attrs, [:adult, :imdb_id, :release_date, :runtime, :tagline, :video, :media_id, :collection_id])
    |> validate_required([:adult, :release_date, :runtime, :media_id])
  end
end
