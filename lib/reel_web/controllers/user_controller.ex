defmodule ReelWeb.UserController do
  use ReelWeb, :controller

  alias ReelWeb.User

  plug Guardian.Plug.EnsureAuthenticated, handler: ReelWeb.AuthController

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json-api", data: users)
  end

  def current(conn, _) do
    user = conn
    |> Guardian.Plug.current_resource

    conn
    |> render(ReelWeb.UserView, "show.json-api", data: user)
  end
end
