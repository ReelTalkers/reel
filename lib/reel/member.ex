defmodule Reel.Member do
  use Reel, :model

  schema "members" do
    field :role, :string

    belongs_to :group, Group
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(%Member{} = member, attrs) do
    member
    |> cast(attrs, [:group_id, :user_id, :role])
    |> validate_required([:group_id, :user_id, :role])
  end
end
