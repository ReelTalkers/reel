defmodule Reel.Repo.Migrations.CreateProduces do
  use Ecto.Migration

  def change do
    create table(:produces) do
      add :company_id, :integer
      add :medium_id, :integer

      timestamps()
    end

  end
end
