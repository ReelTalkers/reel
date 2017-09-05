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

    has_one :movie, Movie
    has_one :show, Show

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

  # https://stackoverflow.com/questions/42212425/conditional-validation-in-ecto-for-or-1-of-2-fields-is-required
  def validate_required_inclusion(changeset, fields) do
    if Enum.any?(fields, &present?(changeset, &1)) do
      changeset
    else
      # Add the error to the first field only since Ecto requires a field name for each error.
      add_error(changeset, hd(fields), "One of these fields must be present: #{inspect fields}")
    end
  end

  def present?(changeset, field) do
    value = get_field(changeset, field)
    value && value != ""
  end

  @doc false
  def changeset(%Medium{} = medium, attrs) do
    medium
    |> cast(attrs, [:backdrop, :budget, :homepage, :name, :original_name, :poster, :overview, :revenue, :status, :tmdb_id, :tmdb_average, :tmdb_popularity, :tmdb_vote_count, :original_language_id])
    |> validate_required([:budget, :name, :original_name, :revenue, :status, :original_language_id])
    |> validate_required_inclusion([:movie, :show])
  end
end
