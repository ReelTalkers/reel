defmodule Reel.Company do
  use Reel, :model

  schema "companies" do
    field :name, :string
    field :tmdb_id, :integer

    has_many :produces, Produce
    has_many :productions, through: [:produces, :medium]

    timestamps()
  end

  @doc false
  def changeset(%Company{} = company, attrs) do
    company
    |> cast(attrs, [:name, :tmdb_id])
    |> validate_required([:name, :tmdb_id])
  end
end
