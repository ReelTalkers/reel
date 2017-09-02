defmodule Reel.Create do
  use Reel, :model

  schema "creates" do
    belongs_to :job, Job
    belongs_to :medium, Medium
    belongs_to :person, Person

    timestamps()
  end

  @doc false
  def changeset(%Create{} = create, attrs) do
    create
    |> cast(attrs, [:person_id, :medium_id, :job_id])
    |> validate_required([:person_id, :medium_id, :job_id])
  end
end
