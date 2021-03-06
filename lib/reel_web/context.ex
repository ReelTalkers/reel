defmodule ReelWeb.Context do
  @moduledoc """
  This module is just a regular plug that can look at the conn struct and build
  the appropriate absinthe context.
  """

  @behaviour Plug

  def init(opts), do: opts
  def call(conn, _) do
    conn
  end
  #
  # def authorize(auth_token) do
  #   InjectDetect.State.User.find(auth_token: auth_token)
  #   |> case do
  #        nil  -> {:error, "Invalid authorization token"}
  #        user -> {:ok, user.id}
  #      end
  # end
  #
  # def build_context(conn) do
  #   with ["Bearer " <> auth_token] <- get_req_header(conn, "authorization"),
  #        {:ok, user_id}            <- authorize(auth_token)
  #   do
  #     {:ok, %{user_id: user_id}}
  #   else
  #     []    -> {:ok, %{}}
  #     error -> error
  #   end
  # end
  #
  # def call(conn, _) do
  #   case build_context(conn) do
  #     {:ok, context} ->
  #       put_private(conn, :absinthe, %{context: context})
  #     {:error, reason} ->
  #       conn
  #       |> send_resp(403, reason)
  #       |> halt()
  #     _ ->
  #       conn
  #       |> send_resp(400, "Bad Request")
  #       |> halt()
  #   end
  # end
end
