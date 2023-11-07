defmodule ApiElixirWeb.GradeJSON do
  alias ApiElixir.Grades.Grade

  @doc """
  Renders a list of grades.
  """
  def index(%{grades: grades}) do
    %{data: for(grade <- grades, do: data(grade))}
  end

  @doc """
  Renders a single grade.
  """
  def show(%{grade: grade}) do
    %{data: data(grade)}
  end

  defp data(%Grade{} = grade) do
    %{
      id: grade.id,
      name_grade: grade.name_grade
    }
  end
end
