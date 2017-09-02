defmodule ReelWeb.PersonResolver do
  def one(_args, _info) do
    {:ok, Reel.Repo.one(Reel.Person)}
  end

  def all(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Person)}
  end

  def search(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Person)}
  end
end
