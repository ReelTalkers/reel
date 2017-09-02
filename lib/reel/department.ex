defmodule Reel.Department do
  use Reel, :model

  schema "departments" do
    field :name, :string

    has_many :jobs, Job

    timestamps()
  end

  @doc false
  def changeset(%Department{} = department, attrs) do
    department
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
