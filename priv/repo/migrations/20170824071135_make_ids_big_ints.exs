defmodule Reel.Repo.Migrations.MakeIdsBigInts do
  use Ecto.Migration

  def change do
    alter table(:airs) do
      modify :id, :bigint
      modify :network_id, :bigint
      modify :show_id, :bigint
    end
    alter table(:collections) do
      modify :id, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:companies) do
      modify :id, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:creates) do
      modify :id, :bigint
      modify :job_id, :bigint
      modify :medium_id, :bigint
      modify :person_id, :bigint
    end
    alter table(:departments) do
      modify :id, :bigint
    end
    alter table(:episodes) do
      modify :id, :bigint
      modify :season_id, :bigint
    end
    alter table(:genres) do
      modify :id, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:guest_stars) do
      modify :id, :bigint
      modify :episode_id, :bigint
      modify :person_id, :bigint
    end
    alter table(:jobs) do
      modify :id, :bigint
      modify :department_id, :bigint
    end
    alter table(:media_genres) do
      modify :id, :bigint
      modify :genre_id, :bigint
      modify :medium_id, :bigint
    end
    alter table(:media_sources) do
      modify :id, :bigint
      modify :medium_id, :bigint
      modify :source_id, :bigint
    end
    alter table(:media) do
      modify :id, :bigint
      modify :budget, :bigint
      modify :revenue, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:movies) do
      modify :id, :bigint
      modify :media_id, :bigint
    end
    alter table(:networks) do
      modify :id, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:people) do
      modify :id, :bigint
      modify :tmdb_id, :bigint
      modify :user_id, :bigint
    end
    alter table(:produces) do
      modify :id, :bigint
      modify :company_id, :bigint
      modify :medium_id, :bigint
    end
    alter table(:reviews) do
      modify :id, :bigint
      modify :medium_id, :bigint
      modify :user_id, :bigint
    end
    alter table(:seasons) do
      modify :id, :bigint
      modify :show_id, :bigint
      modify :tmdb_id, :bigint
    end
    alter table(:shows) do
      modify :id, :bigint
      modify :medium_id, :bigint
    end
    alter table(:sources) do
      modify :id, :bigint
    end
    alter table(:spoken_languages) do
      modify :id, :bigint
      modify :media_id, :bigint
    end
    alter table(:stars_in) do
      modify :id, :bigint
      modify :medium_id, :bigint
      modify :person_id, :bigint
    end
  end
end
