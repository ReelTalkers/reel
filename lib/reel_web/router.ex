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
    plug :accepts, ["json", "json-api"]
    plug JaSerializer.Deserializer
  end

  pipeline :api_auth do
    plug :accepts, ["json", "json-api"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug JaSerializer.Deserializer
  end

  pipeline :graphql do
    plug :fetch_session
    plug :fetch_flash
    plug ReelWeb.Context
  end

  scope "/api/v1", ReelWeb do
    pipe_through :api_auth

    resources "/users", UserController, except: [:new, :edit]
      get "/user/current", UserController, :current, as: :current_user
      delete "/logout", AuthController, :delete
  end

  scope "/api/v1/auth", ReelWeb do
    pipe_through :api

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
    post "/signup/confirm", AuthController, :confirm_signup
  end

  scope "/", ReelWeb do
    pipe_through :browser # Use the default browser stack

    get "/", AppController, :index
    get "/signup", AuthController, :signup
  end

  scope "/" do
    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: ReelWeb.Schema
  end

  scope "/graphql" do
    pipe_through :graphql
    forward "/", Absinthe.Plug, schema: ReelWeb.Schema
  end

end
