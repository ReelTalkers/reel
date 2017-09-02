defmodule Reel.Repo.Migrations.RemoveHasOpinions do
  use Ecto.Migration

  def change do
    drop table(:has_opinions)
  end
end
