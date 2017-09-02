defmodule Reel.Medium do
  use Reel, :model

  schema "media" do
    field :backdrop, :string
    field :budget, :integer
    field :homepage, :string
    field :name, :string
    field :original_name, :string
    field :overview, :string
    field :poster, :string
    field :revenue, :integer
    field :status, :string
    field :tmdb_average, :float
    field :tmdb_id, :integer
    field :tmdb_popularity, :float
    field :tmdb_vote_count, :integer

    belongs_to :original_language, Language

    has_many :creates, Create
    has_many :creators, through: [:creates, :person]
    has_many :media_genres, MediumGenre
    has_many :genres, through: [:media_genres, :genre]
    has_many :produces, Produce
    has_many :producers, through: [:produces, :company]
    has_many :media_sources, MediumSource
    has_many :sources, through: [:media_sources, :source]
    has_many :languages, SpokenLanguage
    has_many :spoken_languages, through: [:languages, :language]
    has_many :stars_in, StarIn
    has_many :stars, through: [:stars_in, :person]
    has_many :reviews, Review

    timestamps()
  end

  @doc false
  def changeset(%Medium{} = medium, attrs) do
    medium
    |> cast(attrs, [:backdrop, :budget, :homepage, :name, :original_name, :poster, :overview, :revenue, :status, :tmdb_id, :tmdb_average, :tmdb_popularity, :tmdb_vote_count, :original_language_id])
    |> validate_required([:budget, :name, :original_name, :revenue, :status, :original_language_id])
  end
end
