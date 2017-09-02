defmodule ReelWeb.MediumResolver do
  use ReelWeb, :resolver

  def one(_args, _info) do
    {:ok, Repo.one(Medium)}
  end

  def all(_args, _info) do
    {:ok, Repo.all(Medium)}
  end

  def search(_args, _info) do
    {:ok, Repo.all(Medium)}
  end

  def create(args, _info) do
    Repo.insert(args)
  end

  def filter_by_genre(args, _info) do
    results = Medium
      |> Ecto.Query.join(:inner, [m], mg in MediumGenre, m.id == mg.medium_id)
      |> Ecto.Query.where([m, mg], mg.genre_id == ^args[:genre_id])
      |> Repo.all

    {:ok, results}
  end
end
