defmodule Reel.Air do
  use Reel, :model

  schema "airs" do
    belongs_to :network, Network
    belongs_to :show, Show

    timestamps()
  end

  @doc false
  def changeset(%Air{} = air, attrs) do
    air
    |> cast(attrs, [:network_id, :show_id])
    |> validate_required([:network_id, :show_id])
  end
end
