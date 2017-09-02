defmodule ReelWeb.RoleResolver do
  def one(_args, _info) do
    {:ok, Reel.Repo.one(Reel.Role)}
  end

  def all(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Role)}
  end

  def search(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Role)}
  end
end
