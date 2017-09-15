defmodule Reel.Repo.Migrations.FacebookIdToProviderId do
  use Ecto.Migration

  def change do
    rename table(:users), :facebook_id, to: :auth_provider_id
  end
end
