defmodule Reel.Repo.Migrations.IdsToBigints do
  use Ecto.Migration

  def change do
    alter table(:members) do
      modify :id, :bigint
      modify :group_id, :bigint
      modify :user_id, :bigint
    end
  end
end
