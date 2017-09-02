defmodule Reel.MediumSource do
  use Reel, :model

  schema "media_sources" do
    belongs_to :medium, Medium
    belongs_to :source, Source

    timestamps()
  end

  @doc false
  def changeset(%MediumSource{} = medium_source, attrs) do
    medium_source
    |> cast(attrs, [:source_id, :medium_id])
    |> validate_required([:source_id, :medium_id])
  end
end
