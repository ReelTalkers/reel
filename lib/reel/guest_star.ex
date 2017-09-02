defmodule Reel.GuestStar do
  use Reel, :model

  schema "guest_stars" do
    field :character, :string
    belongs_to :episode, Episode
    belongs_to :person, Person

    timestamps()
  end

  @doc false
  def changeset(%GuestStar{} = guest_star, attrs) do
    guest_star
    |> cast(attrs, [:episode_id, :person_id, :character])
    |> validate_required([:episode_id, :person_id, :character])
  end
end
