defmodule ApiElixir.Grades.Grade do
  use Ecto.Schema
  import Ecto.Changeset

  schema "grades" do
    field :name_grade, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(grade, attrs) do
    grade
    |> cast(attrs, [:name_grade])
    |> validate_required([:name_grade])
  end
end
