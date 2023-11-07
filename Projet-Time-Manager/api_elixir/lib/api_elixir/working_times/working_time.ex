defmodule ApiElixir.WorkingTimes.WorkingTime do
  use Ecto.Schema
  import Ecto.Changeset
  require Logger

  schema "working_times" do
    field :start_shift, :naive_datetime
    field :end_shift, :naive_datetime
    # field :user_id, :id
    belongs_to :user, ApiElixir.Admin.User, foreign_key: :user_id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(working_time, attrs) do
    #Logger.debug "context-debug: #{inspect(attrs)}"
    working_time
    |> cast(attrs, [:start_shift, :end_shift,:user_id])
    |> validate_required([:start_shift, :end_shift,:user_id])
  end
end
