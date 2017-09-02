defmodule Reel.Job do
  use Reel, :model

  schema "jobs" do
    field :name, :string

    belongs_to :department, Department

    has_many :creates, Create
    has_many :professionals, through: [:creates, :person]

    timestamps()
  end

  @doc false
  def changeset(%Job{} = job, attrs) do
    job
    |> cast(attrs, [:name, :department_id])
    |> validate_required([:name, :department_id])
  end
end
