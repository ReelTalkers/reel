defmodule Reel.Repo.Migrations.CreateGenres do
  use Ecto.Migration

  def change do
    create table(:genres) do
      add :name, :string
      add :tmdb_id, :integer

      timestamps()
    end

  end
end
