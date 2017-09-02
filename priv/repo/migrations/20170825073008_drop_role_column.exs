defmodule Reel.Repo.Migrations.DropRoleColumn do
  use Ecto.Migration

  def change do
    alter table(:members) do
      remove :role
    end
  end
end
