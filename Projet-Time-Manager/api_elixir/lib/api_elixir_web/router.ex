defmodule ApiElixirWeb.Router do
  use ApiElixirWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ApiElixirWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ApiElixirWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Other scopes may use custom stacks.
  scope "/api", ApiElixirWeb do
    pipe_through :api

    get "/users", UserController, :by_email
    get "/users/:id", UserController, :show
    post "/users", UserController, :create
    post "/users/auth", UserController, :auth
    put "/users/:id", UserController, :update
    delete "/users/:id", UserController, :delete

    get "/workingtimes/:userID", WorkingTimeController, :user_by_date
    get "/workingtimes/:userID/:id", WorkingTimeController, :show
    post "/workingtimes/:userID", WorkingTimeController, :create
    put "/workingtimes/:id", WorkingTimeController, :update
    delete "/workingtimes/:id", WorkingTimeController, :delete
    delete "/workingtimesByUserId/:user_id", WorkingTimeController, :deleteByUserId

    get "/clock/:userID", ClockController, :show
    get "/clock/last/:userID", ClockController, :get_last_entry
    post "/clock/:userID", ClockController, :create
    delete "/clockByUserId/:user_id", ClockController, :deleteByUserId


  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:api_elixir, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ApiElixirWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
