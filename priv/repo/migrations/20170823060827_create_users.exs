defmodule Reel.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :facebook_id, :string
      add :facebook_picture, :string
      add :is_private, :boolean, default: false, null: false

      timestamps()
    end

  end
end
