defmodule ApiElixir.Admin.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :firstname, :string
    field :email, :string
    field :password, :string
    belongs_to :role, ApiElixir.Admin.User, foreign_key: :grade
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :firstname, :email, :password])
    |> validate_required([:name, :firstname, :email, :password])
  end
end
