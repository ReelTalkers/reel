defmodule Reel.Repo.Migrations.CreateAirs do
  use Ecto.Migration

  def change do
    create table(:airs) do
      add :network_id, :integer
      add :show_id, :integer

      timestamps()
    end

  end
end
