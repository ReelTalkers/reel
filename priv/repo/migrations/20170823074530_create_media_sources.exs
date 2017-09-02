defmodule Reel.Repo.Migrations.CreateMediaSources do
  use Ecto.Migration

  def change do
    create table(:media_sources) do
      add :source_id, :integer
      add :medium_id, :integer

      timestamps()
    end

  end
end
