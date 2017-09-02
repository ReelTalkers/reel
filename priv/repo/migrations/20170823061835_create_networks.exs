defmodule Reel.Repo.Migrations.CreateNetworks do
  use Ecto.Migration

  def change do
    create table(:networks) do
      add :tmdb_id, :integer
      add :name, :string

      timestamps()
    end

  end
end
