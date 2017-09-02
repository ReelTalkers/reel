defmodule ReelWeb.CrewMemberResolver do
  def one(_args, _info) do
    {:ok, Reel.Repo.one(Reel.CrewMember)}
  end

  def all(_args, _info) do
    {:ok, Reel.Repo.all(Reel.CrewMember)}
  end

  def search(_args, _info) do
    {:ok, Reel.Repo.all(Reel.CrewMember)}
  end
end
