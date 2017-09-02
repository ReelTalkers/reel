defmodule Reel.Repo.Migrations.CreateHasOpinions do
  use Ecto.Migration

  def change do
    create table(:has_opinions) do
      add :person_id, :integer
      add :user_id, :integer

      timestamps()
    end

  end
end
