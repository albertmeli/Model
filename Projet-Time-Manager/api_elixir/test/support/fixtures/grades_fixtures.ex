defmodule ApiElixir.GradesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ApiElixir.Grades` context.
  """

  @doc """
  Generate a grade.
  """
  def grade_fixture(attrs \\ %{}) do
    {:ok, grade} =
      attrs
      |> Enum.into(%{
        name_grade: "some name_grade"
      })
      |> ApiElixir.Grades.create_grade()

    grade
  end
end
