defmodule Reel.Group do
  use Reel, :model

  schema "groups" do
    field :name, :string

    has_many :group_owners, Owner
    has_many :owners, through: [:group_owners, :user]
    has_many :memberships, Member
    has_many :members, through: [:memberships, :user]

    timestamps()
  end

  @doc false
  def changeset(%Group{} = group, attrs) do
    group
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
