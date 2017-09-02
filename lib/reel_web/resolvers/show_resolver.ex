defmodule ReelWeb.ShowResolver do
  use ReelWeb, :resolver

  def one(_args, _info) do
    {:ok, Repo.one(Show)}
  end

  defp merge_medium(show) do
    show
      |> Map.merge(show.medium)
      |> Map.delete(:medium)
  end

  def all(_args, _info) do
    shows = Show
      |> Repo.all()
      |> Repo.preload([:medium])
      |> Enum.map(&merge_medium/1)
    {:ok, shows}
  end

  def search(_args, _info) do
    {:ok, Repo.all(Show)}
  end

  def create(args, _info) do
    {result, medium} =
      %Medium{}
      |> Medium.changeset(args)
      |> Repo.insert

    %Show{}
    |> Show.changeset(Map.put(args, :medium_id, medium.id))
    |> Repo.insert
  end
end
