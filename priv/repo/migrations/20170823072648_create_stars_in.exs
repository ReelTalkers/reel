defmodule Reel.Repo.Migrations.CreateStarsIn do
  use Ecto.Migration

  def change do
    create table(:stars_in) do
      add :person_id, :integer
      add :medium_id, :integer
      add :character, :string
      add :order, :integer

      timestamps()
    end

  end
end
