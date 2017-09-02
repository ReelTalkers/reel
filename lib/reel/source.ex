defmodule Reel.Source do
  use Reel, :model

  schema "sources" do
    field :link, :string
    field :name, :string
    field :price, :float

    has_many :media_sources, MediumSource
    has_many :media, through: [:media_sources, :medium]

    timestamps()
  end

  @doc false
  def changeset(%Source{} = source, attrs) do
    source
    |> cast(attrs, [:name, :link, :price])
    |> validate_required([:name, :link, :price])
  end
end
