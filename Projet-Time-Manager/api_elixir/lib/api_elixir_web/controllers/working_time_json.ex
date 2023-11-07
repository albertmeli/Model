defmodule ApiElixirWeb.WorkingTimeJSON do
  alias ApiElixir.WorkingTimes.WorkingTime

  @doc """
  Renders a list of working_times.
  """
  def index(%{working_times: working_times}) do
    %{data: for(working_time <- working_times, do: data(working_time))}
  end

  @doc """
  Renders a single working_time.
  """
  def show(%{working_time: working_time}) do
    %{data: data(working_time)}
  end
  def showCreate(%{working_time: working_time}) do
    %{data: dataCreate(working_time)}
  end

  defp data(%WorkingTime{} = working_time) do
    %{
      id: working_time.id,
      start_shift: working_time.start_shift,
      end_shift: working_time.end_shift,
      # user_id: working_time.user_id,
      # user: %{
      #   id: working_time.user.id,
      #   name: working_time.user.name,
      #   email: working_time.user.email,
      # }
    }
  end
  defp dataCreate(%WorkingTime{} = working_time) do
    %{
      id: working_time.id,
      start_shift: working_time.start_shift,
      end_shift: working_time.end_shift,
      user_id: working_time.user_id,

    }
  end
end
