defmodule Reel.Repo.Migrations.UsersIdToBigint do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :id, :bigint
    end
  end
end
