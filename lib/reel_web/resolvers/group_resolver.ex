defmodule ReelWeb.GroupResolver do
  use ReelWeb, :resolver

  def one(_args, _info) do
    {:ok, Repo.one(Group)}
  end

  def all(_args, _info) do
    {:ok, Repo.all(Group)}
  end

  def search(_args, _info) do
    {:ok, Repo.all(Group)}
  end

  def create(args, _info) do
    result = %Group{name: args[:name]}
      |> Repo.insert
  end
end
