defmodule Reel.Repo.Migrations.CreateOwners do
  use Ecto.Migration

  def change do
    create table(:owners) do
      add :group_id, :bigint
      add :user_id, :bigint

      timestamps()
    end

  end
end
