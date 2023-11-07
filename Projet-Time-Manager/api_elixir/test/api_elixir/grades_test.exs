defmodule ApiElixir.GradesTest do
  use ApiElixir.DataCase

  alias ApiElixir.Grades

  describe "grades" do
    alias ApiElixir.Grades.Grade

    import ApiElixir.GradesFixtures

    @invalid_attrs %{name_grade: nil}

    test "list_grades/0 returns all grades" do
      grade = grade_fixture()
      assert Grades.list_grades() == [grade]
    end

    test "get_grade!/1 returns the grade with given id" do
      grade = grade_fixture()
      assert Grades.get_grade!(grade.id) == grade
    end

    test "create_grade/1 with valid data creates a grade" do
      valid_attrs = %{name_grade: "some name_grade"}

      assert {:ok, %Grade{} = grade} = Grades.create_grade(valid_attrs)
      assert grade.name_grade == "some name_grade"
    end

    test "create_grade/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Grades.create_grade(@invalid_attrs)
    end

    test "update_grade/2 with valid data updates the grade" do
      grade = grade_fixture()
      update_attrs = %{name_grade: "some updated name_grade"}

      assert {:ok, %Grade{} = grade} = Grades.update_grade(grade, update_attrs)
      assert grade.name_grade == "some updated name_grade"
    end

    test "update_grade/2 with invalid data returns error changeset" do
      grade = grade_fixture()
      assert {:error, %Ecto.Changeset{}} = Grades.update_grade(grade, @invalid_attrs)
      assert grade == Grades.get_grade!(grade.id)
    end

    test "delete_grade/1 deletes the grade" do
      grade = grade_fixture()
      assert {:ok, %Grade{}} = Grades.delete_grade(grade)
      assert_raise Ecto.NoResultsError, fn -> Grades.get_grade!(grade.id) end
    end

    test "change_grade/1 returns a grade changeset" do
      grade = grade_fixture()
      assert %Ecto.Changeset{} = Grades.change_grade(grade)
    end
  end
end
