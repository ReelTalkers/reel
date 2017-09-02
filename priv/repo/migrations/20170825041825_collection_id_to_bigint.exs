defmodule Reel.Repo.Migrations.CollectionIdToBigint do
  use Ecto.Migration

  def change do
    alter table(:movies) do
      modify :collection_id, :bigint
    end
  end
end
