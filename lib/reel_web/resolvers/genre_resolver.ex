defmodule ReelWeb.GenreResolver do
  use ReelWeb, :resolver

  def create(args, _info) do
    %Genre{}
    |> Genre.changeset(args)
    |> Repo.insert
  end

  defp media_to_graphql(medium) do
    medium
      |> Map.merge(medium.show || %{})
      |> Map.merge(medium.movie || %{})
      |> Map.delete(:show)
      |> Map.delete(:movie)
  end

  defp to_graphql(genre) do
    media = genre.media
      |> Enum.map(&media_to_graphql/1)

    genre
      |> Map.delete(:media_genres)
      |> Map.put(:media, media)
  end

  def partial(args, _info) do
    genres = Genre
      |> where([g], g.id in ^args[:genres])
      |> Repo.all
      |> Repo.preload([media: [:movie, :show]])
      |> Enum.map(&to_graphql/1)

    {:ok, genres}
  end
end
