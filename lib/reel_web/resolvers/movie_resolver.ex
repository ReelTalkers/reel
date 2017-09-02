defmodule ReelWeb.MovieResolver do
  use ReelWeb, :resolver

  defp merge_medium(movie) do
    movie
      |> Map.merge(movie.medium)
      |> Map.delete(:medium)
  end

  def all(_args, _info) do
    movies = Movie
      |> Repo.all()
      |> Repo.preload([:medium])
      |> Enum.map(&merge_medium/1)
    {:ok, movies}
  end

  def create(args, _info) do
    {result, medium} =
      %Medium{}
      |> Medium.changeset(args)
      |> Repo.insert

    %Movie{}
    |> Movie.changeset(Map.put(args, :medium_id, medium.id))
    |> Repo.insert
  end
end
