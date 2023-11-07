defmodule ApiElixir.AdminFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ApiElixir.Admin` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        firstname: "some firstname",
        name: "some name"
      })
      |> ApiElixir.Admin.create_user()

    user
  end
end
