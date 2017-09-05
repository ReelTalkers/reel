defmodule ReelWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema
  import_types ReelWeb.Schema.Types

  query do
    field :user, :user do
      resolve &ReelWeb.UserResolver.one/2
    end

    field :groups, list_of(:group) do
      resolve &ReelWeb.GroupResolver.all/2
    end

    field :shows, list_of(:show) do
      resolve &ReelWeb.ShowResolver.all/2
    end

    field :movies, list_of(:movie) do
      resolve &ReelWeb.MovieResolver.all/2
    end

    field :genres, list_of(:genre) do
      arg :genres, list_of(:integer)
      resolve &ReelWeb.GenreResolver.partial/2
    end

    # field :media, list_of(:medium) do
    #   arg :genre_id, non_null(:id)
    #   resolve &ReelWeb.MediumResolver.filter_by_genre/2
    # end
    #
    # field :current_user, :user do
    #   resolve &ReelWeb.UserResolver.current/2
    # end
    #
    # field :users, list_of(:user) do
    #   resolve &ReelWeb.UserResolver.all/2
    # end
    #
    # field :cast, list_of(:cast) do
    #   resolve &ReelWeb.CastResolver.all/2
    # end
    #
    # field :crew, list_of(:crew) do
    #   resolve &ReelWeb.CrewResolver.all/2
    # end
    #
    field :people, list_of(:person) do
      resolve &ReelWeb.PersonResolver.all/2
    end
    #
    # field :all_media, list_of(:media) do
    #   resolve &ReelWeb.MediaResolver.all/2
    # end
    #
    # field :search_media, list_of(:media) do
    #   resolve &ReelWeb.MediaResolver.search/2
    # end
    #
    # field :search_users, list_of(:user) do
    #   resolve &ReelWeb.UserResolver.search/2
    # end
    #
    # field :recommendations, list_of(:media) do
    #   resolve &ReelWeb.MediaResolver.search/3
    # end
    #
    # field :logged_in, :boolean do
    #   false
    # end
  end

  mutation do
    field :create_group, type: :group do
      arg :name, non_null(:string)
      resolve &ReelWeb.GroupResolver.create/2
    end

    field :create_genre, type: :genre do
      arg :name, non_null(:string)
      arg :tmdb_id, :string
      resolve &ReelWeb.GenreResolver.create/2
    end

    field :create_show, type: :show do
      arg :backdrop, :string
      arg :budget, non_null(:integer)
      arg :homepage, :string
      arg :name, non_null(:string)
      arg :original_name, non_null(:string)
      arg :overview, :string
      arg :poster, :string
      arg :revenue, non_null(:integer)
      arg :status, non_null(:string)
      arg :tmdb_average, :float
      arg :tmdb_id, :integer
      arg :tmdb_popularity, :float
      arg :tmdb_vote_count, :integer
      arg :original_language_id, non_null(:integer)
      arg :first_air_date, non_null(:date)
      arg :in_production, non_null(:boolean)
      arg :last_air_date, non_null(:date)
      arg :type, non_null(:string)
      arg :episode_runtimes, non_null(list_of(:integer))
      arg :origin_countries, non_null(list_of(:string))
      resolve &ReelWeb.ShowResolver.create/2
    end

    field :create_movie, type: :movie do
      arg :backdrop, :string
      arg :budget, non_null(:integer)
      arg :homepage, :string
      arg :name, non_null(:string)
      arg :original_name, non_null(:string)
      arg :overview, :string
      arg :poster, :string
      arg :revenue, non_null(:integer)
      arg :status, non_null(:string)
      arg :tmdb_average, :float
      arg :tmdb_id, :integer
      arg :tmdb_popularity, :float
      arg :tmdb_vote_count, :integer
      arg :original_language_id, non_null(:integer)
      arg :adult, non_null(:boolean)
      arg :imdb_id, non_null(:string)
      arg :release_date, non_null(:date)
      arg :runtime, non_null(:integer)
      arg :tagline, :string
      arg :video, :boolean
      resolve &ReelWeb.MovieResolver.create/2
    end

    # field :review_media, type: :review do
    #   arg :media_id, non_null(:id)
    #   arg :score, non_null(:int)
    #   resolve &ReelWeb.ReviewResolver.create/2
    # end
    #
    # field :create_user, type: :user do
    #    arg :username, non_null(:string)
    #    arg :name, non_null(:string)
    #    arg :email, non_null(:string)
    #    resolve &ReelWeb.UserResolver.create/2
    # end
  end
end
