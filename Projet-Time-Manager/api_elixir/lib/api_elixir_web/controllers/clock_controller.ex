defmodule ApiElixirWeb.ClockController do
  use ApiElixirWeb, :controller

  alias ApiElixir.Clocks
  alias ApiElixir.Clocks.Clock
  require Logger

  action_fallback ApiElixirWeb.FallbackController

  def index(conn, _params) do
    clocks = Clocks.list_clocks()
    render(conn, :index, clocks: clocks)
  end

  def get_last_entry(conn, %{"userID" => id}) do
    clock = Clocks.get_last_clock_by_userId!(id)
    Logger.debug "my-log: #{inspect(clock)}"
    render(conn, :show, clock: clock)
  end

  def create(conn, clock_params) do
    id_user = Map.get(conn.params, "userID")
    status = Map.get(conn.params, "status")
    # Si le paramètre "id_user" existe, ajoutez-le à working_time_params
    Logger.info "my-log: #{inspect(status)}"
    if id_user != nil do
      current_naive_datetime = NaiveDateTime.utc_now()
      clock_params = Map.put(clock_params, "user_id", id_user)
      clock_params = Map.put(clock_params, "time", current_naive_datetime)
      clock_params = Map.put(clock_params, "status", status)
      Logger.debug "my-log: #{inspect(clock_params)}"
      with {:ok, %Clock{} = clock} <- Clocks.create_clock(clock_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/clocks/#{clock}")
        |> render(:show, clock: clock)
      end
    end
  end

  def show(conn, %{"userID" => id}) do
    clock = Clocks.get_by_userId!(id)
    Logger.debug "my-log: #{inspect(clock)}"
    render(conn, :show, clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Clocks.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Clocks.update_clock(clock, clock_params) do
      render(conn, :index, clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Clocks.get_clock!(id)

    with {:ok, %Clock{}} <- Clocks.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
