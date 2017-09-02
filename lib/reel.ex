defmodule Reel do
  @moduledoc """
  Reel keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  def model do
    quote do
      use Ecto.Schema
      import Ecto.Changeset
      alias Reel.Repo

      # Alias each model so we don't need the Reel namespace
      # Keep these in alphabetical order
      alias Reel.Air
      alias Reel.Collection
      alias Reel.Company
      alias Reel.Create
      alias Reel.Department
      alias Reel.Episode
      alias Reel.Genre
      alias Reel.Group
      alias Reel.GuestStar
      alias Reel.Job
      alias Reel.Language
      alias Reel.MediumGenre
      alias Reel.MediumSource
      alias Reel.Medium
      alias Reel.Member
      alias Reel.Movie
      alias Reel.Network
      alias Reel.Owner
      alias Reel.Person
      alias Reel.Produce
      alias Reel.Review
      alias Reel.Season
      alias Reel.Show
      alias Reel.Source
      alias Reel.SpokenLanguage
      alias Reel.StarIn
      alias Reel.User
    end
  end

  @doc """
  When used, dispatch to the model.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
