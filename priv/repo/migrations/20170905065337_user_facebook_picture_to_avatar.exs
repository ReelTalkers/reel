defmodule Reel.Repo.Migrations.UserFacebookPictureToAvatar do
  use Ecto.Migration

  def change do
    rename table(:users), :facebook_picture, to: :avatar
  end
end
