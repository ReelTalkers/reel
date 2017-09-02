defmodule ReelWeb.Router do
  use ReelWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug :fetch_session
    plug :fetch_flash
    plug ReelWeb.Context
  end

  scope "/", ReelWeb do
    pipe_through :browser # Use the default browser stack

    get "/", AppController, :index
  end

  scope "/" do
    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: ReelWeb.Schema
  end

  scope "/graphql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug, schema: ReelWeb.Schema
  end

end
