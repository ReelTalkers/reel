defmodule Reel.StarIn do
  use Reel, :model

  schema "stars_in" do
    field :character, :string
    field :order, :integer

    belongs_to :person, Person
    belongs_to :medium, Medium

    timestamps()
  end

  @doc false
  def changeset(%StarIn{} = star_in, attrs) do
    star_in
    |> cast(attrs, [:person_id, :medium_id, :character, :order])
    |> validate_required([:person_id, :medium_id, :character, :order])
  end
end
