defmodule Reel.Repo.Migrations.AddLastViewedGroup do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :last_viewed_group_id, :bigint
    end
  end
end
