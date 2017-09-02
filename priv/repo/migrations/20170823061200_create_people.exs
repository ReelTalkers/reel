defmodule Reel.Repo.Migrations.CreatePeople do
  use Ecto.Migration

  def change do
    create table(:people) do
      add :name, :string
      add :picture, :string
      add :tmdb_id, :integer

      timestamps()
    end

  end
end
