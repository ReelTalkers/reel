defmodule Reel.Repo.Migrations.CreateMembers do
  use Ecto.Migration

  def change do
    create table(:members) do
      add :group_id, :integer
      add :user_id, :integer
      add :role, :string

      timestamps()
    end

  end
end
