defmodule Reel.Repo.Migrations.AddUserAuthProvider do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :auth_provider, :string
    end

    create index(:users, [:email], unique: true)
  end
end
