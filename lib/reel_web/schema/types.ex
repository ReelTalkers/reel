defmodule ReelWeb.Schema.Types do
  @moduledoc """
  Module where GraphQL types are declared.
  """
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  @desc """
  The `Time` scalar type represents time values provided in the ISOz
  datetime format (that is, the ISO 8601 format without the timezone offset, eg,
  "2015-06-24T04:50:34Z").
  """
  scalar :time, description: "ISOz time" do
    parse &Timex.DateFormat.parse(&1.value, "{ISOz}")
    serialize &Timex.DateFormat.format!(&1, "{ISOz}")
  end

  @desc """
  The `Date` scalar type represents time values provided in the ISO8601
  datetime format (e.g. "2015-06-24").
  """
  scalar :date, description: "ISO8601 date" do
    parse &parse_date(&1.value)
    serialize &Date.to_string(&1)
  end

  def parse_date(value) do
    case Date.from_iso8601(value) do
      {:ok, val} -> {:ok, val}
      {:error, _} -> :error
    end
  end

  # input_object :episode_runtimes do
  #   field :type, non_null(:contact_type)
  #   field :value, non_null(:string)
  # end

  object :user do
    field :id, :id
    field :username, :string
    field :name, :string
    field :email, :string
    # field :reviews, list_of(:review)
    # field :inserted_at, :time
    field :facebook_picture, :string
    field :facebook_id, :string
    field :is_private, :boolean
  end

  object :group do
    field :id, :id
    field :name, :string
    field :members, list_of(:user)
    field :owners, list_of(:user)

  end

  object :person do
    field :id, :id
    field :name, :string
    field :picture, :string
    # field :roles, list_of(:role)
    # field :credits, list_of(:crew_member)
  end

  interface :medium do
    description "A movie or a show"

    field :id, :id
    field :backdrop, :string
    field :budget, :integer
    field :homepage, :string
    field :name, :string
    field :original_name, :string
    field :overview, :string
    field :poster, :string
    field :revenue, :integer
    field :status, :string
    field :tmdb_average, :float
    field :tmdb_id, :integer
    field :tmdb_popularity, :float
    field :tmdb_vote_count, :integer

    resolve_type fn
      %{release_date: _}, _ -> :movie
      %{first_air_date: _}, _ -> :show
      _, _ -> nil
    end
  end

  object :show do
    field :id, :id
    field :backdrop, :string
    field :budget, :integer
    field :homepage, :string
    field :name, :string
    field :original_name, :string
    field :overview, :string
    field :poster, :string
    field :revenue, :integer
    field :status, :string
    field :tmdb_average, :float
    field :tmdb_id, :integer
    field :tmdb_popularity, :float
    field :tmdb_vote_count, :integer

    field :first_air_date, :date
    field :in_production, :boolean
    field :last_air_date, :date
    field :type, :string
    field :episode_runtimes, list_of(:integer)
    field :origin_countries, list_of(:string)

    interface :medium
  end

  object :movie do
    field :id, :id
    field :backdrop, :string
    field :budget, :integer
    field :homepage, :string
    field :name, :string
    field :original_name, :string
    field :overview, :string
    field :poster, :string
    field :revenue, :integer
    field :status, :string
    field :tmdb_average, :float
    field :tmdb_id, :integer
    field :tmdb_popularity, :float
    field :tmdb_vote_count, :integer

    field :adult, :boolean
    field :imdb_id, :string
    field :release_date, :date
    field :runtime, :integer
    field :tagline, :string
    field :video, :boolean

    interface :medium
  end

  connection node_type: :medium

  object :genre do
    field :name, :string
    field :tmdb_id, :integer

    connection field :media, node_type: :medium do
      resolve fn
        pagination_args, %{source: genre} ->
          Absinthe.Relay.Connection.from_list(
            genre.media,
            pagination_args
          )
      end
    end
  end

end
