defmodule Reel.Repo.Migrations.RenameMediaIdToMediumId do
  use Ecto.Migration

  def change do
    rename table(:spoken_languages), :media_id, to: :medium_id
    rename table(:movies), :media_id, to: :medium_id
  end
end
