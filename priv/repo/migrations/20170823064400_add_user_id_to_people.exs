defmodule Reel.Repo.Migrations.AddUserIdToPeople do
  use Ecto.Migration

  def change do
    alter table(:people) do
      add :user_id, :integer
    end
  end
end
