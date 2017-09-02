defmodule Reel.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :name, :string
      add :department_id, :integer

      timestamps()
    end

  end
end
