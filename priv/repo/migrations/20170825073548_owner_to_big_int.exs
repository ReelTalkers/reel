defmodule Reel.Repo.Migrations.OwnerToBigInt do
  use Ecto.Migration

  def change do
    alter table(:owners) do
      modify :id, :bigint
    end
  end
end
