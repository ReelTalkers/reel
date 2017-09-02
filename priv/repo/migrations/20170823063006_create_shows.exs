defmodule Reel.Repo.Migrations.CreateShows do
  use Ecto.Migration

  def change do
    create table(:shows) do
      add :first_air_date, :date
      add :in_production, :boolean, default: false, null: false
      add :last_air_date, :date
      add :type, :string
      add :medium_id, :integer

      timestamps()
    end

  end
end
