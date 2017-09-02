defmodule Reel.Show do
  use Reel, :model

  schema "shows" do
    field :first_air_date, :date
    field :in_production, :boolean, default: false
    field :last_air_date, :date
    field :type, :string
    field :episode_runtimes, {:array, :integer}
    field :origin_countries, {:array, :string}

    belongs_to :medium, Medium

    has_many :airings, Air
    has_many :networks, through: [:airings, :network]

    timestamps()
  end

  @doc false
  def changeset(%Show{} = show, attrs) do
    show
    |> cast(attrs, [:first_air_date, :in_production, :last_air_date, :type, :medium_id])
    |> validate_required([:first_air_date, :in_production, :last_air_date, :type, :medium_id])
  end
end
