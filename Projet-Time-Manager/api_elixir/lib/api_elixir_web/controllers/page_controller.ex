defmodule ApiElixirWeb.PageController do
  use ApiElixirWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end
  def test(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    text(conn, "hello")
  end
end
