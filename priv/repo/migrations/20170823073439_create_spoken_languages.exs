defmodule Reel.Repo.Migrations.CreateSpokenLanguages do
  use Ecto.Migration

  def change do
    create table(:spoken_languages) do
      add :media_id, :integer
      add :language_id, :integer

      timestamps()
    end

  end
end
