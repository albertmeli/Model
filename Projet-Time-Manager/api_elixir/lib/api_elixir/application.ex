defmodule ApiElixir.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ApiElixirWeb.Telemetry,
      ApiElixir.Repo,
      {DNSCluster, query: Application.get_env(:api_elixir, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ApiElixir.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: ApiElixir.Finch},
      # Start a worker by calling: ApiElixir.Worker.start_link(arg)
      # {ApiElixir.Worker, arg},
      # Start to serve requests, typically the last entry
      ApiElixirWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ApiElixir.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ApiElixirWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
