defmodule Reel.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :score, :integer
      add :medium_id, :integer
      add :user_id, :integer

      timestamps()
    end

  end
end
