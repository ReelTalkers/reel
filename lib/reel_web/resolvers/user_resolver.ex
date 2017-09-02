defmodule ReelWeb.UserResolver do
  def one(_args, _info) do
    {:ok, Reel.Repo.one(Reel.User)}
  end

  def all(_args, _info) do
    {:ok, Reel.Repo.all(Reel.User)}
  end

  def search(_args, _info) do
    {:ok, Reel.Repo.all(Reel.User)}
  end

  def current(_args, _info) do
    {:ok, Reel.Repo.one(Reel.User)}
  end
end
