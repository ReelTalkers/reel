defmodule Reel.Repo.Migrations.CreateMovies do
  use Ecto.Migration

  def change do
    create table(:movies) do
      add :adult, :boolean, default: false, null: false
      add :imdb_id, :string
      add :release_date, :date
      add :runtime, :integer
      add :tagline, :string
      add :video, :boolean, default: false, null: false
      add :media_id, :integer
      add :collection_id, :integer

      timestamps()
    end

  end
end
