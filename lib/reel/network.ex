defmodule Reel.Network do
  use Reel, :model

  schema "networks" do
    field :name, :string
    field :tmdb_id, :integer

    has_many :airings, Air
    has_many :shows, through: [:airings, :show]

    timestamps()
  end

  @doc false
  def changeset(%Network{} = network, attrs) do
    network
    |> cast(attrs, [:tmdb_id, :name])
    |> validate_required([:tmdb_id, :name])
  end
end
