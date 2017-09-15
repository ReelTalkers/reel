# Reel

To start your Phoenix server:

  1. Install dependencies with `mix deps.get`
  1. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  1. Install Node.js dependencies with `cd assets && npm install && cd ..`
  1. Copy `.env.example` to `.env`
  1. Fill out the Facebook and Google secrets.
  1. Run `mix guardian.gen.secret` to get the `GUARDIAN_SECRET` hash.
  1. Fill out the database connection information.
  1. Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
