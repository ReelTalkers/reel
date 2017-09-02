defmodule Reel.Repo.Migrations.CreateEpisodes do
  use Ecto.Migration

  def change do
    create table(:episodes) do
      add :air_date, :date
      add :episode_number, :integer
      add :name, :string
      add :overview, :string
      add :production_code, :string
      add :season_number, :integer
      add :tmdb_average, :float
      add :tmdb_vote_count, :integer
      add :season_id, :integer

      timestamps()
    end

  end
end
