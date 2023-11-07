defmodule ApiElixirWeb.ClockJSON do
  alias ApiElixir.Clocks.Clock

  @doc """
  Renders a list of clocks.
  """
  def index(%{clocks: clocks}) do
    %{data: for(clock <- clocks, do: data(clock))}
  end

  @doc """
  Renders a single clock.
  """
  def show(%{clock: clock}) do
    %{data: data(clock)}
  end

  defp data(clock_list) when is_list(clock_list) do
    Enum.map(clock_list, &data/1)
  end

  defp data(%Clock{} = clock) do
    %{
      id: clock.id,
      time: clock.time,
      status: clock.status,
      # user_id: clock.user_id,
      # user: %{
      #   id: clock.user.id,
      #   name: clock.user.name,
      #   email: clock.user.email,
      # }
    }
  end
end
