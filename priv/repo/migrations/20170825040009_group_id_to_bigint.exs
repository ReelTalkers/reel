defmodule Reel.Repo.Migrations.GroupIdToBigint do
  use Ecto.Migration

  def change do
    alter table(:groups) do
      modify :id, :bigint
    end
  end
end
