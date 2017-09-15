defmodule ReelWeb.AuthController do
  @moduledoc """
  Auth controller responsible for handling Ueberauth responses
  """
  use ReelWeb, :controller

  alias Reel.User
  alias Ueberauth.Auth

  plug Ueberauth

  def delete(conn, _params) do
    # Sign out the user
    conn
    |> put_status(200)
    |> Guardian.Plug.sign_out(conn)
  end

  def callback(conn, %{
    "provider" => "facebook"
  } = params) do
    auth = conn.assigns.ueberauth_auth
    info = conn.assigns.ueberauth_auth.info
    sign_in_user(conn, %{
      "data" => %{
        "type" => "auth",
        "attributes" => %{
          "token" => auth.credentials.token,
          "email" => info.email,
          "first_name" => info.first_name,
          "last_name" => info.last_name,
          "avatar" => info.image,
          "auth_provider" => "facebook"
        }
      }
    })
  end

  def callback(conn, %{
    "provider" => "google"
  } = params) do
    auth = conn.assigns.ueberauth_auth
    info = conn.assigns.ueberauth_auth.info
    sign_in_user(conn, %{
      "data" => %{
        "type" => "auth",
        "attributes" => %{
          "token" => auth.credentials.token,
          "email" => info.email,
          "first_name" => info.first_name,
          "last_name" => info.last_name,
          "avatar" => info.image,
          "auth_provider" => "google"
        }
      }
    })
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    # This callback is called when the user denies the app to get the
    # data from the oauth provider
    conn
    |> put_status(401)
    |> render(ReelWeb.ErrorView, "401.json-api")
  end

  def sign_in_user(conn, %{
    "data" => %{
      "type" => "auth",
      "attributes" => %{
        "token" => token,
        "email" => email,
        "first_name" => first_name,
        "last_name" => last_name,
        "avatar" => avatar
      }
    }
  }) do
    try do
      # Attempt to retrieve exactly one user from the DB, whose
      # email matches the one provided with the login request
      user = User
      |> where(email: ^email)
      |> Repo.one!

      cond do
        true ->
          # Successful login
          # Encode a JWT
          { :ok, jwt, _ } = Guardian.encode_and_sign(user, :token)

          auth_conn = Guardian.Plug.api_sign_in(conn, user)
          jwt = Guardian.Plug.current_token(auth_conn)
          {:ok, claims} = Guardian.Plug.claims(auth_conn)

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
        IO.inspect e

      redirect conn, to: "/signup"
        # Sign the user up
        # sign_up_user(conn, %{
        #   "data" => %{
        #     "type" => "auth",
        #     "attributes" => %{
        #       "token" => token,
        #       "email" => email,
        #       "first_name" => first_name,
        #       "last_name" => last_name,
        #       "avatar" => avatar
        #     }
        #   }
        # })
    end
  end

  def signup(conn, _params)
    render conn, "index.html"
  end

  def confirm_signup(conn, params)
    require IEx; IEx.pry
    sign_up_user(conn, params)
  end

  def sign_up_user(conn, %{
    "data" => %{
      "type" => "auth",
      "attributes" => %{
        "token" => token,
        "email" => email,
        "first_name" => first_name,
        "last_name" => last_name,
        "avatar" => avatar,
        "username" => username,
        "auth_provider" => auth_provider
      }
    }
  }) do
    require IEx; IEx.pry
    changeset = User.changeset %User{}, %{
      email: email,
      avatar: avatar,
      first_name: first_name,
      last_name: last_name,
      username: username,
      auth_provider: auth_provider
    }

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

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render(ReelWeb.ErrorView, "401.json-api")
  end
end
