defmodule Reel.Repo.Migrations.CreateLanguages do
  use Ecto.Migration

  def change do
    create table(:languages) do
      add :name, :string
      add :iso_639_1, :string

      timestamps()
    end

  end
end
