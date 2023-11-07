defmodule ApiElixir.ClocksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ApiElixir.Clocks` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-23 11:30:00]
      })
      |> ApiElixir.Clocks.create_clock()

    clock
  end

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-23 11:54:00]
      })
      |> ApiElixir.Clocks.create_clock()

    clock
  end

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2023-10-23 14:31:00]
      })
      |> ApiElixir.Clocks.create_clock()

    clock
  end
end
