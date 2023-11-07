defmodule ApiElixir.WorkingTimesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ApiElixir.WorkingTimes` context.
  """

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end_shift: ~N[2023-10-23 11:30:00],
        start_shift: ~N[2023-10-23 11:30:00]
      })
      |> ApiElixir.WorkingTimes.create_working_time()

    working_time
  end

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end_shift: ~N[2023-10-23 11:54:00],
        start_shift: ~N[2023-10-23 11:54:00]
      })
      |> ApiElixir.WorkingTimes.create_working_time()

    working_time
  end

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end_shift: ~N[2023-10-23 14:31:00],
        start_shift: ~N[2023-10-23 14:31:00]
      })
      |> ApiElixir.WorkingTimes.create_working_time()

    working_time
  end
end
