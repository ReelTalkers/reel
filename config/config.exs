# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :reel,
  ecto_repos: [Reel.Repo]

# Configures the endpoint
config :reel, ReelWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "FBtJXEM6wDTLRgdWowxZciXjYGaXagX2AKlIoTlMz42tSOMe+aqxHNY6cejEr+BS",
  render_errors: [view: ReelWeb.ErrorView, accepts: ~w(html json json-api)],
  pubsub: [name: Reel.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Change the json response type to json-api
config :phoenix, :format_encoders,
  "json-api": Poison

config :plug, :types, %{
 "application/vnd.api+json" => ["json-api"]
}

# Ueberauth Config for oauth
config :ueberauth, Ueberauth,
  base_path: "/api/v1/auth",
  providers: [
    facebook: { Ueberauth.Strategy.Facebook, [profile_fields: "name,email,first_name,last_name"] },
    google: { Ueberauth.Strategy.Google, [] },
    identity: { Ueberauth.Strategy.Identity, [
        callback_methods: ["POST"],
        uid_field: :username,
        nickname_field: :username,
      ] },
  ]

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

# Ueberauth Strategy Config for Google oauth
config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
  redirect_uri: System.get_env("GOOGLE_REDIRECT_URI")

# Guardian configuration
config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "ReelWeb",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: System.get_env("GUARDIAN_SECRET"),
  serializer: ReelWeb.GuardianSerializer

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
