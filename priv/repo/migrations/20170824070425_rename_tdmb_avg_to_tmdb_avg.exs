defmodule Reel.Repo.Migrations.RenameTdmbAvgToTmdbAvg do
  use Ecto.Migration

  def change do
    rename table(:media), :tdmb_average, to: :tmdb_average
  end
end
