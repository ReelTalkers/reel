defmodule Reel.Repo.Migrations.AddArraysToShow do
  use Ecto.Migration

  def change do
    alter table(:shows) do
      add :episode_runtimes, {:array, :integer}
      add :origin_countries, {:array, :string}
    end

  end
end
