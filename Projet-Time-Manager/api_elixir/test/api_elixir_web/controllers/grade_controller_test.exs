defmodule ApiElixirWeb.GradeControllerTest do
  use ApiElixirWeb.ConnCase

  import ApiElixir.GradesFixtures

  alias ApiElixir.Grades.Grade

  @create_attrs %{
    name_grade: "some name_grade"
  }
  @update_attrs %{
    name_grade: "some updated name_grade"
  }
  @invalid_attrs %{name_grade: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all grades", %{conn: conn} do
      conn = get(conn, ~p"/api/grades")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create grade" do
    test "renders grade when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/grades", grade: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/grades/#{id}")

      assert %{
               "id" => ^id,
               "name_grade" => "some name_grade"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/grades", grade: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update grade" do
    setup [:create_grade]

    test "renders grade when data is valid", %{conn: conn, grade: %Grade{id: id} = grade} do
      conn = put(conn, ~p"/api/grades/#{grade}", grade: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/grades/#{id}")

      assert %{
               "id" => ^id,
               "name_grade" => "some updated name_grade"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, grade: grade} do
      conn = put(conn, ~p"/api/grades/#{grade}", grade: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete grade" do
    setup [:create_grade]

    test "deletes chosen grade", %{conn: conn, grade: grade} do
      conn = delete(conn, ~p"/api/grades/#{grade}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/grades/#{grade}")
      end
    end
  end

  defp create_grade(_) do
    grade = grade_fixture()
    %{grade: grade}
  end
end
