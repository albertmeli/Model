defmodule ApiElixir.Clocks.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :status, :boolean, default: true
    field :time, :naive_datetime
     # field :user_id, :id
    belongs_to :user, ApiElixir.Admin.User, foreign_key: :user_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:user_id, :time,:status])
    |> validate_required([:user_id, :time,:status])
  end
end
