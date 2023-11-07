defmodule ApiElixirWeb.UserController do
  use ApiElixirWeb, :controller

  alias ApiElixir.Admin
  alias ApiElixir.Admin.User

  action_fallback ApiElixirWeb.FallbackController

  def index(conn, _params) do
    users = Admin.list_users()
    render(conn, :index, users: users)
  end

  def by_email(conn, _params) do
    email = Map.get(conn.params, "email")
    name = Map.get(conn.params, "name")

    if is_nil(email) or is_nil(name) do
      users = Admin.list_users()
      render(conn, :index, users: users)
    else
      users = Admin.get_email!(name,email)
      render(conn, :index, users: users)
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Admin.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:show, user: user)
    end
  end
  def auth(conn, %{"user" => user_params}) do
    users = Admin.get_auth(user_params)
    render(conn, :index, users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Admin.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Admin.get_user!(id)

    with {:ok, %User{} = user} <- Admin.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Admin.get_user!(id)

    with {:ok, %User{}} <- Admin.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
