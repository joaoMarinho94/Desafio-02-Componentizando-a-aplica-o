import { GenreResponseProps, MovieProps } from "../interfaces";
import "../styles/content.scss";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { MovieCard } from "./MovieCard";

interface Props {
  selectedGenre: GenreResponseProps;
  loading: boolean;
  movies: MovieProps[];
}

export function Content({ selectedGenre, movies, loading }: Props) {
  return (
    <div className="container">
      <Header selectedGenre={selectedGenre} />

      {loading && <Loading />}

      {!loading && (
        <main>
          <div className="movies-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
