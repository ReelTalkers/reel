defmodule ReelWeb.ReviewResolver do
  def one(_args, _info) do
    {:ok, Reel.Repo.one(Reel.Review)}
  end

  def all(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Review)}
  end

  def search(_args, _info) do
    {:ok, Reel.Repo.all(Reel.Review)}
  end
end
