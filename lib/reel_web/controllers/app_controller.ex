defmodule ReelWeb.AppController do
  use ReelWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
