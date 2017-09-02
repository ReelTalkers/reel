defmodule Reel.Produce do
  use Reel, :model

  schema "produces" do
    belongs_to :company, Company
    belongs_to :medium, Medium

    timestamps()
  end

  @doc false
  def changeset(%Produce{} = produce, attrs) do
    produce
    |> cast(attrs, [:company_id, :medium_id])
    |> validate_required([:company_id, :medium_id])
  end
end
