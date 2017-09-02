use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :reel, ReelWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :reel, Reel.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "Y7EUFQaX4jZI",
  database: "reel_test",
  hostname: "localhost",
  template: "template0",
  pool: Ecto.Adapters.SQL.Sandbox
