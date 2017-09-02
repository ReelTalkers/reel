defmodule Reel.Repo.Migrations.CreateSeasons do
  use Ecto.Migration

  def change do
    create table(:seasons) do
      add :air_date, :date
      add :name, :string
      add :overview, :string
      add :poster, :string
      add :season_number, :integer
      add :tmdb_id, :integer
      add :show_id, :integer

      timestamps()
    end

  end
end
