defmodule Reel.Repo.Migrations.CreateGuestStars do
  use Ecto.Migration

  def change do
    create table(:guest_stars) do
      add :episode_id, :integer
      add :person_id, :integer
      add :character, :string

      timestamps()
    end

  end
end
