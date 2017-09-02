defmodule Reel.Repo.Migrations.CreateCreates do
  use Ecto.Migration

  def change do
    create table(:creates) do
      add :person_id, :integer
      add :medium_id, :integer
      add :job_id, :integer

      timestamps()
    end

  end
end
