defmodule Reel.Review do
  use Reel, :model

  schema "reviews" do
    field :score, :integer

    belongs_to :medium, Medium
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(%Review{} = review, attrs) do
    review
    |> cast(attrs, [:score, :medium_id, :user_id])
    |> validate_required([:score, :medium_id, :user_id])
  end
end
