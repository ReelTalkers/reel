defmodule ReelWeb.AuthController do
  use ReelWeb, :controller
  alias Reel.User
  alias ReelWeb.Guardian
  plug Ueberauth

  plug :scrub_params, "user" when action in [:sign_in_user]

  def request(_params) do
  end

  def delete(conn, params) do
    conn
      |> put_status(200)
      |> Guardian.Plug.sign_out(conn)
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    require IEx; IEx.pry
    # Called when user denies the app to get the data from the oauth provider
    conn
      |> put_status(401)
      |> render(ReelWeb.ErrorView, "401.json-api")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    require IEx; IEx.pry
    case AuthUser.basic_info(auth) do
      {:ok, user} ->
        sign_in_user(conn, %{"user" => user})
    end

    case AuthUser.basic_info(auth) do
      {:ok, user} ->
        conn
        |> render(ReelWeb.UserView, "show.json-api", %{data: user})
      {:error} ->
        conn
        |> put_status(401)
        |> render(ReelWeb.ErrorView, "401.json-api")
    end
  end

  def sign_in_user(conn, %{"user" => user}) do
    try do
      user = User
      |> where(email: ^user.email)
      |> Repo.one!

      cond do
        true ->
          # Successful login
          # Encode a JWT
          { :ok, jwt, _ } = Guardian.encode_and_sign(user, :token)

          auth_conn = Guardian.Plug.sign_in(conn, user)
          jwt = Guardian.Plug.current_token(auth_conn)
          {:ok, claims} = Guardian.Plug.current_claims(auth_conn)

          auth_conn
          |> put_resp_header("authorization", "Bearer #{jwt}")
          |> json(%{access_token: jwt}) # Return token to the client

        false ->
          # Unsuccessful login
          conn
          |> put_status(401)
          |> render(ReelWeb.ErrorView, "401.json-api")
      end
    rescue
      e ->
        IO.inspect e # Print error to the console for debugging

        # Successful registration
        sign_up_user(conn, %{"user" => user})
    end
  end

  def sign_up_user(conn, %{"user" => user}) do
    changeset = User.changeset %User{}, %{email: user.email,
      avatar: user.avatar,
      first_name: user.first_name,
      last_name: user.last_name,
      auth_provider: "google"}

    case Repo.insert changeset do
      {:ok, user} ->
        # Encode a JWT
        { :ok, jwt, _ } = Guardian.encode_and_sign(user, :token)

        conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> json(%{access_token: jwt}) # Return token to the client
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ReelWeb.ErrorView, "422.json-api")
    end
  end

  def unauthenticated(conn, params) do
    conn
    |> put_status(401)
    |> render(ReelWeb.ErrorView, "401.json-api")
  end

  def unauthorized(conn, params) do
    conn
    |> put_status(403)
    |> render(ReelWeb.ErrorView, "403.json-api")
  end

  def already_authenticated(conn, params) do
    conn
    |> put_status(200)
    |> render(ReelWeb.ErrorView, "200.json-api")
  end

  def no_resource(conn, params) do
    conn
    |> put_status(404)
    |> render(ReelWeb.ErrorView, "404.json-api")
  end
end
