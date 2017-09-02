defmodule Reel.Repo.Migrations.CreateMedia do
  use Ecto.Migration

  def change do
    create table(:media) do
      add :backdrop, :string
      add :budget, :integer
      add :homepage, :string
      add :name, :string
      add :original_name, :string
      add :poster, :string
      add :overview, :string
      add :revenue, :integer
      add :status, :string
      add :tmdb_id, :integer
      add :tdmb_average, :float
      add :tmdb_popularity, :float
      add :tmdb_vote_count, :integer
      add :original_language_id, :integer

      timestamps()
    end

  end
end
