defmodule Reel.Repo.Migrations.CreateCollections do
  use Ecto.Migration

  def change do
    create table(:collections) do
      add :backdrop, :string
      add :name, :string
      add :overview, :string
      add :poster, :string
      add :tmdb_id, :integer

      timestamps()
    end

  end
end
