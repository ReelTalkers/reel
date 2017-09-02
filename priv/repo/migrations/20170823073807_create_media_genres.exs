defmodule Reel.Repo.Migrations.CreateMediaGenres do
  use Ecto.Migration

  def change do
    create table(:media_genres) do
      add :medium_id, :integer
      add :genre_id, :integer

      timestamps()
    end

  end
end
