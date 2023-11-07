defmodule ApiElixirWeb.WorkingTimeController do
  use ApiElixirWeb, :controller

  alias ApiElixir.WorkingTimes
  alias ApiElixir.WorkingTimes.WorkingTime
  require Logger
  action_fallback ApiElixirWeb.FallbackController

  def index(conn, _params) do
    working_times = WorkingTimes.list_working_times()
    render(conn, :index, working_times: working_times)
  end

  def user_by_date(conn, _params) do
    Logger.debug "context-debug: #{inspect(conn.params)}"
    id = Map.get(conn.params, "userID")
    start = Map.get(conn.params, "start")
    end_at = Map.get(conn.params, "end_at")

    if is_nil(id) or is_nil(start) or is_nil(end_at) do
      working_times = WorkingTimes.get_by_user_id(id)
      render(conn, :index, working_times: working_times)
    else
      working_times = WorkingTimes.get_by_date!(id, start, end_at)
      render(conn, :index, working_times: working_times)
    end
  end

  def create(conn, %{"working_time" => working_time_params}) do
     # Vérifiez si le paramètre "id_user" existe dans les paramètres de la requête

    id_user = Map.get(conn.params, "userID")
    # Si le paramètre "id_user" existe, ajoutez-le à working_time_params
    if id_user != nil do
      current_naive_datetime = NaiveDateTime.utc_now()
      working_time_params = Map.put(working_time_params, "user_id", id_user)
      # working_time_params = Map.put(working_time_params, "start_shift", current_naive_datetime)
      # working_time_params = Map.put(working_time_params, "end_shift", current_naive_datetime)

      #Logger.debug "my-log: #{inspect(working_time_params)}"
      with {:ok, %WorkingTime{} = working_time} <- WorkingTimes.create_working_time(working_time_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", ~p"/api/working_times/#{working_time}")
        |> render(:showCreate, working_time: working_time)
      end
    end
  end

  def show(conn, %{"userID" => user_id, "id"=>id}) do

    working_time = WorkingTimes.get_by_user_id!(user_id,id)
    Logger.debug "context-debug: #{inspect(working_time)}"
    render(conn, :show, working_time: working_time)
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    working_time = WorkingTimes.get_working_time!(id)

    with {:ok, %WorkingTime{} = working_time} <- WorkingTimes.update_working_time(working_time, working_time_params) do
      render(conn, :show, working_time: working_time)
    end
  end

  def delete(conn, %{"id" => id}) do
    working_time = WorkingTimes.get_working_time!(id)

    with {:ok, %WorkingTime{}} <- WorkingTimes.delete_working_time(working_time) do
      send_resp(conn, :no_content, "")
    end
  end
end
