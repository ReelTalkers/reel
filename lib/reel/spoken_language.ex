defmodule Reel.SpokenLanguage do
  use Reel, :model

  schema "spoken_languages" do
    belongs_to :language, Language
    belongs_to :medium, Medium

    timestamps()
  end

  @doc false
  def changeset(%SpokenLanguage{} = spoken_language, attrs) do
    spoken_language
    |> cast(attrs, [:media_id, :language_id])
    |> validate_required([:media_id, :language_id])
  end
end
