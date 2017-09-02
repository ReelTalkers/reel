defmodule Reel.Language do
  use Reel, :model

  schema "languages" do
    field :iso_639_1, :string
    field :name, :string

    has_many :spoken_languages, SpokenLanguage
    has_many :featured_in, through: [:spoken_languages, :medium]

    timestamps()
  end

  @doc false
  def changeset(%Language{} = language, attrs) do
    language
    |> cast(attrs, [:name, :iso_639_1])
    |> validate_required([:name, :iso_639_1])
  end
end
