defmodule Reel.Repo.Migrations.CreateSources do
  use Ecto.Migration

  def change do
    create table(:sources) do
      add :name, :string
      add :link, :string
      add :price, :float

      timestamps()
    end

  end
end
