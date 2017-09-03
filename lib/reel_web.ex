defmodule ReelWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, views, channels and so on.

  This can be used in your application as:

      use ReelWeb, :controller
      use ReelWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below. Instead, define any helper function in modules
  and import those modules here.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: ReelWeb
      import Plug.Conn
      import ReelWeb.Router.Helpers
      import ReelWeb.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/reel_web/templates",
                        namespace: ReelWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import ReelWeb.Router.Helpers
      import ReelWeb.ErrorHelpers
      import ReelWeb.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import ReelWeb.Gettext
    end
  end

  def resolver do
    quote do
      import Ecto.Query, only: [first: 1, where: 3, join: 5]
      alias Reel.Repo

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
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
