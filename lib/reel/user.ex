defmodule Reel.User do
  use Reel, :model

  schema "users" do
    field :email, :string
    field :facebook_id, :string
    field :facebook_picture, :string
    field :first_name, :string
    field :is_private, :boolean, default: false
    field :last_name, :string
    field :username, :string
    belongs_to :last_viewed_group, Group

    has_one :media_personality, Person

    has_many :memberships, Member
    has_many :groups, through: [:memberships, :group]
    has_many :ownerships, Owner
    has_many :owned_groups, through: [:ownerships, :group]
    has_many :reviews, Review

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:username, :first_name, :last_name, :email, :facebook_id, :facebook_picture, :is_private])
    |> validate_required([:username, :first_name, :last_name, :email, :facebook_id, :facebook_picture, :is_private])
  end
end
